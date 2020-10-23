document.getElementById('pub-add')
        .addEventListener('click', function () {
          store.dispatch({ type: 'COUNT_INCREMENT' })
        })

document.getElementById('pub-minus')
.addEventListener('click', function () {
    store.dispatch({ type: 'COUNT_DECREMENT' })
})