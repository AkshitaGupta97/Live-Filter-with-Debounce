
const users = document.querySelector('.user-list');
const userName = document.querySelector('#user');

const userArray = [];  // we are creating an empty array to push the li, so that we can get names, or required data

const getUserData = async() => {
    try{
        const res = await fetch('https://api.github.com/users');
        const data = await res.json();
      //  console.log(data);

        if(data){ // after fetching data i want to remove 'loading..'
            users.innerHTML = '';
        }

        data.map((user) => {
            const li = document.createElement('li');

            userArray.push(li);

            li.insertAdjacentHTML('afterbegin',
                `
                <div class="user-data">
                    <img src="${user.avatar_url}" alt="${user.avatar_url}">
                    <div>
                        <p><i> ${user.login} </i></p>
                        <a href="${user.html_url}" target="_blank">${user.html_url}</a>
                    </div>
                </div>
                `
            )
            users.appendChild(li)

        })
       
    }
    catch {
        console.log('Error occurred.. Fix it'); 
    }
}

/*userName.addEventListener('input', (event) => {
    const val = event.target.value;

  //  console.log(val);
    
    userArray.filter((currEle) => {
        // it means yaha wahi log karwaoo jo ham type kiye hai
        currEle.innerText.toLowerCase().includes(val.toLowerCase()) ? 
        currEle.classList.remove('hide') :  // remove hide means => i want to display all names
        currEle.classList.add('hide');
        
    })
    
})*/

// instead of it now i am using Debounce, because jab bhi hum name type kar rahe the to oo single letter me search karta hai, which is wrong practice
// jab last letter of word complete ho jaega tab search akrte hai

const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {  // using rest parameter to get argumnets
        clearTimeout(timer);
       timer =  setTimeout(() => {
            func.apply(this, args)
        }, timeout);
    }
}

const getUser = (val) => {
    userArray.filter((currEle) => {
        // it means yaha wahi log karwaoo jo ham type kiye hai
        currEle.innerText.toLowerCase().includes(val.toLowerCase()) ? 
        currEle.classList.remove('hide') :  // remove hide means => i want to display all names
        currEle.classList.add('hide');
        
    })
}

const debounceGetData = debounce(getUser, 500)

userName.addEventListener("keyup", (event) => {
    debounceGetData(event.target.value)
})

getUserData();

// https://api.github.com/users
// insertAdjacentElement(position, element) used to insert element in page at specific position.
// befogebegin, afterbegin, beforeend, afterend.