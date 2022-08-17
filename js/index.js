document.addEventListener("DOMContentLoaded", function() {
    const bookUrl = "http://localhost:3000/books"

    const newUsername = "Robb"
      fetch(bookUrl)
    .then(function(response){ return response.json() })
    .then(function(data){
        const list = document.querySelector('#list')
        data.forEach(book=>{
        const li = document.createElement('li')
        list.appendChild(li) 
        li.innerHTML = book.title
          li.onclick = function () {
            document.querySelector('#show-panel').innerHTML = ''
            const showPanel = document.querySelector('#show-panel')
            const img = document.createElement('img')
            const ul = document.createElement('ul')
             btn = document.createElement("button")
             unlikeBtn = document.createElement("button")
            img.src = book.img_url 
            showPanel.appendChild(img)
            ul.innerHTML = book.description
            showPanel.appendChild(ul)
           
            let usersList = book.users
            usersList.forEach( (data)=> {

              if (data.username === "Robb") {
                const li = document.createElement('li')
                li.setAttribute('id', newUsername);
                li.innerHTML = newUsername
                showPanel.appendChild(li);
              }
              else {
                const li = document.createElement('li')
                li.innerHTML = data.username
                showPanel.appendChild(li)
              }
            })
           btn.innerHTML = "LIKE"
           showPanel.appendChild(btn)

            btn.onclick = function() {
              const item = document.getElementById(newUsername)
              if (item !== null) {
                // let value = newUsername
                //    newUsersList = usersList.filter(function(item) {
                //   return item !== value
             //})
             usersList.pop()
              console.log(usersList)
             //console.log(newUsersList)
                removeUser(usersList)
              }
              else {addUser()}
            }
            
            
            
            function addUser () {

             
              
                  showPanel.removeChild(showPanel.lastChild);

                fetch ((bookUrl + `/${book.id}`) , {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ users : [...usersList, {username:newUsername}]  })
                })
                const li = document.createElement('li')
                li.setAttribute('id', newUsername);
                li.innerHTML = newUsername
                showPanel.appendChild(li)
                unlikeBtn.innerHTML = "UNLIKE"
                showPanel.appendChild(unlikeBtn)
            }

            unlikeBtn.onclick = () => {
            //   newUsersList = usersList.filter(function(item) {
            //     return item !== newUsername
            // })
              console.log(usersList)
              removeUser(usersList)}
            
            
            function removeUser (usersList) {
              
                showPanel.removeChild(showPanel.lastChild);
               
                console.log(usersList)

              fetch ((bookUrl + `/${book.id}`) , {
                  method: 'PATCH',
                  headers: {
                      "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ users : [...usersList]  })
              })
              const item = document.getElementById(newUsername);
              showPanel.removeChild(item);
              btn.innerHTML = "LIKE"
           showPanel.appendChild(btn)
          }
           
          }

        })
    })
});
