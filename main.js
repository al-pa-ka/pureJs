

const journalsTab = document.querySelector('#journals_tab')

journalsTab.classList.add('tab_active')

document.querySelectorAll('.second-panel>.tab').forEach((el) => {
    el.addEventListener('click', () => {
        el.classList.add('tab_active')
    })
    document.addEventListener('click', (event) =>{
        const isAnotherTabClicked = Array.from(document.querySelectorAll('.second-panel>.tab')).filter((el) => {
            return el.contains(event.target)
        }).length

        if ((!el.contains(event.target)) && isAnotherTabClicked) {
            el.classList.remove('tab_active')
        }
    })
})

// journalsTab.onmouseout = (event) => {
//     const journalsTab = document.querySelector('.journals')

//     if (event.relatedTarget != journalsTab){
//        journalsTab.style.setProperty('display', 'none')
//     } else {
//         journalsTab.onmouseleave = () => {
//             journalsTab.style.setProperty('display', 'none')
//         }
//     }
// }

document.querySelector('.journals').querySelectorAll('.tab').forEach((el, index) => {
    if (index == 1) {
        Array.from(el.children).forEach((child) => {
            child.style.setProperty('color', '#ffe300')
        })
    }
    el.onclick = () => {
        const journalsTab = document.querySelector('.journals')
        journalsTab.onmouseleave = () => {}
        Array.from(el.children).forEach((child) => {
            child.style.setProperty('color', '#ffe300')
        })
    }
    
    document.addEventListener('click', (event) => {
        const isAnotherTabClicked = Array.from(document.querySelectorAll('.tabs-active>.tab')).filter(
            (el) => {
                return el.contains(event.target)
            }
        ).length

        if ((!el.contains(event.target)) && isAnotherTabClicked) {
            Array.from(el.children).forEach((child) => {
                child.style.setProperty('color', 'white')
            })
        }
    })
})
