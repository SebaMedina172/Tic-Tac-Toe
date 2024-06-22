import './style.css'

const COLOR_X = '#FF2E36'; //Todo Color Player X
const COLOR_O = '#08D9D9'; //Todo Color Player O


let boxes = document.querySelectorAll('.box')

let turn = 'X'
let isGameOver = false

boxes.forEach(e=>{
    e.innerHTML = ''

    e.addEventListener('click',()=>{
        if(!isGameOver && e.innerHTML == ''){
            e.innerHTML = turn
            cheakWin();
            cheakDraw();
            
            if (!isGameOver) {
                changeTurn();
            }
        }
    })

})

//Todo Change the turns
const changeTurn = ()=>{
    if(turn === 'X'){
        turn = 'O'
         document.querySelector('.bc').style.left = '50%'
         document.querySelector('.bc').style.backgroundColor = COLOR_O;
         boxes.forEach(box => box.setAttribute('data-player', 'O'));
    }else{
        turn = 'X'
        document.querySelector('.bc').style.left = '0'
        document.querySelector('.bc').style.backgroundColor = COLOR_X;
        boxes.forEach(box => box.setAttribute('data-player', 'X'));

         
    }
}

//Todo Check if there's a win
const cheakWin = ()=>{
    let winCondition = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    for(let i = 0; i < winCondition.length;i++){
        let v0 = boxes[winCondition[i][0]].innerHTML;
        let v1 = boxes[winCondition[i][1]].innerHTML;
        let v2 = boxes[winCondition[i][2]].innerHTML;

        if(v0 != '' && v0 === v1 && v0 ===v2){
            // alert(turn)
            isGameOver = true
            document.querySelector("#results").innerHTML = turn + ' win'        
            document.querySelector('#play-again').style.display = 'inline'
            
            const winColor = turn === 'X' ? COLOR_X : COLOR_O;
            for(let j = 0; j<3;j++){
                boxes[winCondition[i][j]].style.backgroundColor = winColor
                boxes[winCondition[i][j]].style.color = '#000'
            }
        }

    }
}
//Todo Check if it's a draw
const cheakDraw = ()=>{
    if(!isGameOver){
        let isDraw = true;
        boxes.forEach(e=>{
            if(e.innerHTML === '') isDraw = false;
        })
        if(isDraw){
            isGameOver = true
            document.querySelector("#results").innerHTML = 'Draw'       
            document.querySelector('#play-again').style.display = 'inline'
        }
    }
}

//Todo 'Play Again' button function
document.querySelector('#play-again').addEventListener('click',()=>{
    isGameOver = false;
    turn = 'X';
    document.querySelector('.bc').style.left = '0';
    document.querySelector('.bc').style.backgroundColor = COLOR_X;
    document.querySelector('#results').innerHTML = '';
    document.querySelector('#play-again').style.display = 'none';

    boxes.forEach(e =>{
        e.innerHTML = '';
        e.style.removeProperty('background-color');
        e.style.color = '#fff'
    })
})


const setInitialPlayerAttribute = () => {
    const currentPlayer = turn === 'X' ? 'X' : 'O';
    boxes.forEach(box => box.setAttribute('data-player', currentPlayer));
};


document.addEventListener('DOMContentLoaded', () => {
    setInitialPlayerAttribute();
});
