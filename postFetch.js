import { textModal, rectangelModal } from "/app.js"
import { contanerText } from "/app.js"

async function todoGet() {

    await fetch('https://parseapi.back4app.com/classes/todo', {
        method: "GET",
        headers: {
            'X-Parse-Application-Id': 'wqA0gHQaWjB1KV2b1SSEqxVS7grDx0atw8Cjn3LV',
            'X-Parse-REST-API-Key': '3INjLDt0ALLQRnXDcQ8p2gEErHAl6i90H29q8K6v',
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const todosData = data.results
            contanerText.innerHTML = ''

            todosData.forEach(data => {

                contanerText.insertAdjacentHTML(`beforeend`, `
                 <div class="rectangel-to-do text-todo animait" style="background-color: ${data.color}" data-id="${data.objectId}">
                    <p class="text to-do-text text-todo" data-id="${data.objectId}">
                        ${data.text}
                    </p>
                    <div class="circle circle-i">
                        <i class="fa-solid fa-xmark icon-check iconHandeler" data-name="${data.complated}"></i>
                    </div>
                </div>`
                )
            })
        })
    circleHandeler()
}


function circleHandeler() {
    let circle = document.querySelectorAll('.circle-i');
    circle.forEach(circle => {
        let icon = circle.querySelector('.iconHandeler');

        if (icon.dataset.name == 'true') {
            icon.className = 'fa-solid fa-check icon-check iconHandeler'
        } else {
            icon.className = 'fa-solid fa-xmark icon-check iconHandeler'
            circle.style.cssText = 'box-shadow: inset 0 0 1rem red'
        }
    })
}

async function postTodo(boolean) {
    const todoSample = {
        text: textModal.innerHTML,
        complated: boolean,
        color: rectangelModal.style.backgroundColor
    }

    // await fetch('https://create-user-defult-default-rtdb.firebaseio.com/todo.json', {
    //     method: 'POST',
    //     headers: {
    //         'content-type' : 'application/json'
    //     },
    //     body: JSON.stringify(todoSample)
    // })
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
    await fetch('https://parseapi.back4app.com/classes/todo', {
        method: 'POST',
        headers: {
            'X-Parse-Application-Id': 'wqA0gHQaWjB1KV2b1SSEqxVS7grDx0atw8Cjn3LV',
            'X-Parse-REST-API-Key': '3INjLDt0ALLQRnXDcQ8p2gEErHAl6i90H29q8K6v',
            'content-type': 'application/json'
        },
        body: JSON.stringify(todoSample)
    })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}
function deleteHandeler(id) {
    console.log(id);

    fetch(`https://parseapi.back4app.com/classes/todo/${id}`, {
        method: 'DELETE',
        headers: {
            'X-Parse-Application-Id': 'wqA0gHQaWjB1KV2b1SSEqxVS7grDx0atw8Cjn3LV',
            'X-Parse-REST-API-Key': '3INjLDt0ALLQRnXDcQ8p2gEErHAl6i90H29q8K6v',
            'content-type': 'application/json'
        }
    }).then(res => {
        console.log(res);
        todoGet()
    })
}

export { todoGet, postTodo, deleteHandeler }