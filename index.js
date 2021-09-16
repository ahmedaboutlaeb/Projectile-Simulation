 

    //initiallize canvas
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');

    //initiallize  the dimension of the canvas
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 3;

    //fucntion to match the input value with the value attribut
    function updateInputs() {
      Inputang.setAttribute('value', Inputang.value);
      Inputvel.setAttribute('value', Inputvel.value);
    }

    //Labels
    const xD = document.getElementById("Xdistance");        //the total distance covered in x-axis
    const yD = document.getElementById("Ydistance");        //the total distance covered in y-axis
    const time = document.getElementById("time");
    const fireBtn = document.getElementById("fireBtn");      //fire button
    const resetBtn = document.getElementById("resetBtn");   //reset button
    const Inputvel = document.getElementById('velocity');    //speed of the ball
    const Inputang = document.getElementById('angle');       //theta
    const r = 5;                                            //size of the ball
    let v = Number(Inputvel.value);
    let theta = Number(Inputang.value) * Math.PI / 180;
    const g = 9.8;
    const vx = v * Math.cos(theta);                         // Velocity on the X-axis
    const vy = v * Math.sin(theta);                         // Velocity on the Y-axis
    const dx = (Math.pow(v, 2) * Math.sin(2 * theta)) / g;  // Range (displacement or distance traveled on the X axis)
    const dy = (Math.pow(v, 2) * Math.pow(Math.sin(theta), 2)) / (2 * g); // Maximum height
    const t = (2 * v * Math.sin(theta)) / g;                               // Total displacement time
    const speed = document.getElementById("speed");
    let rnt = 0; //time passed from  point of firing 




    //to cancel the recursion funciton of animation
    function stopanimate() {
      window.cancelAnimationFrame(request)
    }

    const updateSpeedText = () => {
      document.getElementById('speedValue').innerText = speed.value;
    };
    //function to clear the animation from the canvas 
    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };


    class Ball {
      constructor(x, y) {
        this.x = x;//x postion
        this.y = y;//y position
      }
      color = "red"

      drawBall() {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      // we need to calculate the next cordinates (x,y) of each frame 
      //so this function will change the position of x and y of the ball on each frame 

      update() {
        let currentX = vx * rnt;
        let currentY = vy * rnt + 0.5 * (-1 * g) * Math.pow(rnt, 2)

        if (rnt <= t) {
          this.x = currentX;
          this.y = canvas.height - currentY
          //monitor the change of the displacement and time
          xD.innerText = Number.parseFloat(currentX).toFixed(1);
          yD.innerText = Number.parseFloat(dy).toFixed(1);
          time.innerText = Number.parseFloat(rnt).toFixed(1)
          rnt += speed.value / 60;//devide the speed value by 60 fram per second 
          //to control the speed of the animation 
        }


        //to adjust the canvas if the displacemetn is greater than the canvas
        if (dx > canvas.width) canvas.width = dx + r;
        if (dy > canvas.height) canvas.height = dy + r;

      }


    }
    //initiallize ball object 
    let ball = new Ball(0 + r, canvas.height - r)
    ball.drawBall() //show ball on the screen



    function animate() {
      if (rnt < t) {
        //  clearCanvas()  if you want to clear tracking of the ball uncomment this line
        ball.update();
        ball.drawBall();
        console.log("animation is running")
        request = window.requestAnimationFrame(animate)//each 0.016 sec animate function will be invoked 

      }

    }





    fireBtn.addEventListener('click', function () {
      Inputang.disabled = Inputvel.disabled = fireBtn.disabled = true;
      resetBtn.disabled = false;
      animate()
    })

    resetBtn.addEventListener('click', function () {
      Inputang.disabled = Inputvel.disabled = fireBtn.disabled = false;
      resetBtn.disabled = true;
      stopanimate()
      clearCanvas()
      //to draw a ball after clearint the canvas 
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(r, canvas.height - r, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      rnt = 0 // to reset the position of currentX and currentY
      xD.innerText = '0';
      yD.innerText = '0';
      time.innerText = '0';
    })

