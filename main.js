let canvas = document.getElementById("canvas");

let context = canvas.getContext("2d")

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width / 2;
canvas.style.background = "#103855"

let names = [];

let input = document.getElementById("input")
let table = document.getElementById("table")
let button = document.getElementById("button")
let wheel = document.getElementById("wheel")
let result = document.getElementById("result")


button.addEventListener('click', () => {
    const name = input.value
    if (name) {
        names.push(name)
        updateTable()
        input.value = ''
    }

})
const updateTable = () => {
    table.innerHTML = names.map((name, index) =>
        `<ul style={list-style-type: none;} >
        <li >${index + 1}-${name}</li>
        </ul>`

    ).join('');
    table.style.listStyleType = "none";

}

const x = canvas.width / 2;
const y = canvas.height / 2;
const radius = 300;

const drawCircle = () => {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false)
    context.fillStyle = "#d0d3d4";
    context.fill();
    context.strokeStyle = "#d0d3d4";
    context.stroke();
}



const drawSlice = (rotation = 0) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();

    if (names.length === 0) return;

    const sliceAngle = (2 * Math.PI) / names.length;
    const colors = ["#006798", "#ff7100", "#ffcd2b", "#ffff93", "#003435"]

    for (let i = 0; i < names.length; i++) {
        const startAngle = i * sliceAngle + rotation;
        const endAngle = startAngle + sliceAngle;
        const selectedName = names[Math.floor(Math.random() * names.length)]

        result.innerHTML =`${selectedName}`
        result.style.color='white'
        result.style.background='#103855'
        result.style.width="200px"
        result.style.height="60px"
        result.style.display="flex"
        result.style.justifyContent="center"
        result.style.textAlign="center"
        result.style.borderRadius="10px"

        context.beginPath();
        context.moveTo(x, y);
        context.arc(x, y, radius, startAngle, endAngle);
        context.closePath()

        context.fillStyle = colors[i % colors.length]


        context.fill();
        context.stroke();

        const textAngle = startAngle + sliceAngle / 2;
        const textX = x + (radius / 1.5) * Math.cos(textAngle);
        const textY = y + (radius / 1.5) * Math.sin(textAngle);

        context.save();
        context.translate(textX, textY)
        context.rotate(textAngle)
        context.textAlign = 'center'
        context.fillStyle = 'black'
        context.font = "16px Arial";
        context.fillText(names[i], 0, 0)
        context.restore();



    }
}

const spinWheel = () => {
    let rotation = 0;
    const totalRotation = Math.random() * Math.PI * 2 + Math.PI * 4;
    const duration = 3000;
    const start = performance.now();

    const animate = (currentTime) => {
        const elapsed = currentTime - start;

        if (elapsed < duration) {
            const progress = elapsed / duration;
            rotation = progress * totalRotation;
            drawSlice(rotation);
            requestAnimationFrame(animate);
        } else {
            // Animasyon tamamlandı
            drawSlice(totalRotation % (2 * Math.PI));
        }
    };

    requestAnimationFrame(animate);
};


wheel.addEventListener('click', () => {
    if (names.length > 0) {
        spinWheel()

    } else {
        alert('please firstly add a name')
    }

})
drawCircle()


