let todoList = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [];
window.onload = function(){
    drawTodoList(document.getElementsByClassName('todo-list-view')[0], todoList);
}

function addTodo(ev){
    // 첫번째 방법(빈칸들을 문자열로 치환했을 때 공백과 같다면 함수 종료??)
    // if (todo.replace(/ /g,"") === '') // replace() : 문자열에서 변경하려는 문자열이 여러 번 반복될 경우, 첫 번째로 발견한 문자열만 치환
    //     return;
    
    // 두번째 방법 (공백을 제거했을때 빈칸만 있다면 함수 종료)
    if (document.getElementById('search-input').value.trim() === ''){
        return; // 첫번째와 두번째 방법 같은지 질문하기
    }
        
    if (!ev.keyCode || ev.keyCode === 13){
        const todo = document.getElementById('search-input').value;
        console.log("들어옴")
        todoList.push({
            title : todo, 
            date : new Date()
        })

        document.getElementById('search-input').value = '';
        localStorage.setItem('todoList', JSON.stringify(todoList));
        drawTodoList(document.getElementsByClassName('todo-list-view')[0], todoList);
    }
}

function drawTodoList(parent, list){
    $(parent).empty();

    for (let unit of list) {
        const toDoLi = document.createElement('li');
        toDoLi.isDone = false;
        toDoLi.innerHTML = unit.title;
        parent.appendChild(toDoLi);

        const removeToDoli = document.createElement('div');
        removeToDoli.className = 'todo-remove-btn';
        removeToDoli.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        toDoLi.appendChild(removeToDoli);

        toDoLi.onclick = function(ev){     
            ev.target.isDone = !ev.target.isDone;

            if (ev.target.isDone) {
                ev.target.className = 'done';
            } else {
                ev.target.classList.remove('done');
            }
        }

       
        removeToDoli.onclick = function(ev){
            console.log(new Date(unit.date).getTime());
            removeEvent(ev);
            this.parentNode.remove();

            todoList = todoList.filter(function(data){
                let tmpDate = new Date(data.date).getTime();
                let unitTime = new Date(unit.date).getTime();
         
                return (tmpDate !== unitTime);
            })
            localStorage.setItem('todoList', JSON.stringify(todoList))
        }
    }
}

function removeEvent(ev){
    ev.preventDefault(); 
    ev.stopPropagation(); 
    ev.stopImmediatePropagation();
}

// 초기실행 todolist 빈 배열 시작-> js 실행시 input칸 밑에 todolist에 저장된 할일들(배열) 보여줌 -> input칸에 할일적기 
// -> input칸에서 키보드입력후 떼는 순간마다 addTodo(event) 함수 실행(onkeyup 때문) ->