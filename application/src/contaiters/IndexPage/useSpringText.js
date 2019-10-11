export const springText = (target, message) => {
    let COLOR = "#16171F";
    let MESSAGE = message;

    let FONT_SIZE = 100;
    let SIZE = 1.5;
    let INDENT = 3;
    let STEP = 0.5;
    let INITIAL_DISPLACEMENT = 100;
    let INITIAL_VELOCITY = 5;
    let VELOCITY_RETENTION = 0.95;
    let SETTLE_SPEED = 0.5;
    let FLEE_SPEED = 0.5;
    let FLEE_DISTANCE = FONT_SIZE / 2;
    let FLEE = true;
    let SCATTER_VELOCITY = 3;
    let SCATTER = false;
    let MOVED_O;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Mobile
        // MESSAGE = message;
        FONT_SIZE = 50;
        SIZE = 2;
        INITIAL_DISPLACEMENT = 100;
        SETTLE_SPEED = 1;
        FLEE = false;
        SCATTER_VELOCITY = 2;
    }

// MAIN
    FLEE_SPEED /= 10;
    SETTLE_SPEED /= 100;
    SCATTER_VELOCITY *= 10;
    let CLEAR_RADIUS = SIZE * 2;

    const canvas = target.current;
    const ctx = canvas.getContext("2d");
    let POINTS = [];
    let MOVED = [];
    let moved_length = 0;
    let MOUSE = {
        x: 0,
        y: 0
    }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
    function Point(x,y,r,g,b,a) {
        let angle = Math.random() * 6.28;
        this.dest_x = x;
        this.dest_y = y;
        this.original_r = r;
        this.original_g = g;
        this.original_a = a;
        this.lastx = 0;
        this.lasty = 0;
        this.x = canvas.width/2 - x + (Math.random() - 0.5) * INITIAL_DISPLACEMENT;
        this.y = canvas.height/2 - y + (Math.random() - 0.5) * INITIAL_DISPLACEMENT;
        this.velx = INITIAL_VELOCITY * Math.cos(angle);
        this.vely = INITIAL_VELOCITY * Math.sin(angle);
        this.target_x = canvas.width/2 - x;
        this.target_y = canvas.height/2 - y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.moved = false;
        // MOVED[moved_length] = this;
        // moved_length++;

        this.getX = function() {
            return this.x;
        }

        this.getY = function() {
            return this.y;
        }

        this.fleeFrom = function(x, y) {
            this.velx -= ((MOUSE.x - this.x) * FLEE_SPEED);
            this.vely -= ((MOUSE.y - this.y) * FLEE_SPEED);
        }

        this.settleTo = function(x, y) {
            this.velx = VELOCITY_RETENTION * (this.velx + (this.target_x - this.x) * SETTLE_SPEED);
            this.vely = VELOCITY_RETENTION * (this.vely + (this.target_y - this.y) * SETTLE_SPEED);
        }

        this.scatter = function() {
            let unit = this.unitVecTo(MOUSE.x, MOUSE.y);
            let vel = SCATTER_VELOCITY * (0.5 + Math.random() / 2);
            this.velx = -unit.x * vel;
            this.vely = -unit.y * vel;
        }

        this.checkMove = function() {
            this.moved = ((!Math.abs(Math.round(this.target_x - this.x)) == 0) || (!Math.abs(Math.round(this.target_y - this.y)) == 0) || (!Math.abs(Math.round(this.velx)) == 0) || (!Math.abs(Math.round(this.vely)) == 0));
        }

        this.simpleMove = function() {
            this.checkMove();
            if (!this.moved) {
                return;
            }

            this.lastx = this.x;
            this.lasty = this.y;
            this.x += this.velx;
            this.y += this.vely;
            MOVED[moved_length] = this;
            moved_length++;
        }

        this.move = function() {
            if (this.distanceTo(MOUSE.x, MOUSE.y) <= FLEE_DISTANCE) {
                this.fleeFrom(MOUSE.x, MOUSE.y);
            }
            else {
                this.settleTo(this.target_x, this.target_y);
            }
            this.simpleMove();
        }

      this.selfMove = function (i) {
        if (this.distanceTo(MOUSE.x, MOUSE.y) <= FLEE_DISTANCE) {
          this.fleeFrom(MOUSE.x, MOUSE.y);
        }
        else {
          this.settleTo(this.target_x, this.target_y);
        }
        let x, y;
        x = getRandomInt(this.x - STEP, this.x + STEP);
        y = getRandomInt(this.y - STEP, this.y + STEP);
        if ((x <= this.x + STEP && x >= this.x - STEP) && (y <= this.y + STEP && y >= this.y - STEP)) {
          this.x = x;
          this.y = y;
          this.simpleMove();
        }
      }

        this.distanceTo = function(x, y) {
            let dx = x - this.x;
            let dy = y - this.y;
            return Math.sqrt(dx*dx+ dy*dy);
        }

        this.unitVecTo = function(x, y) {
            let dx = x - this.x;
            let dy = y - this.y;
            let d = Math.sqrt(dx*dx + dy*dy);
            return {
                x: dx / d,
                y: dy / d
            };
        }

        this.inMotion = function() {
            return this.moved;
        }

        this.clear = function() {
            ctx.clearRect(this.lastx-CLEAR_RADIUS,this.lasty-CLEAR_RADIUS,CLEAR_RADIUS*2,CLEAR_RADIUS*2);
        }

        this.draw = function() {
            ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
            ctx.beginPath();
            // ctx.arc(this.x,this.y,SIZE,0,2*Math.PI);
            ctx.fillRect(this.x, this.y, SIZE, SIZE);
            ctx.fill();
        }
    }

    const resizeHandler = function() {
        resizeCanvas()
        adjustText()
    }

    window.addEventListener("resize", resizeHandler);

    const moveHandler = function(event) {
        MOUSE.x = event.clientX;
        MOUSE.y = event.clientY;
    };

    if (FLEE) {
        window.addEventListener("mousemove", moveHandler);
    }

    const clickHandler = function(event) {
        MOUSE.x = event.clientX;
        MOUSE.y = event.clientY;
        for (let i=0; i<POINTS.length; i++) {
            POINTS[i].scatter();
        }
    }

    if (SCATTER) {
        window.addEventListener("click", clickHandler);
    }

    function cleanCanvas() {
        window.removeEventListener("resize", resizeHandler);
        if (FLEE) {
            window.removeEventListener("mousemove", moveHandler);
        }
        if (SCATTER) {
            window.removeEventListener("click", clickHandler);
        }
        POINTS = [];
        MOVED = [];
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }

    function resizeCanvas() {
        canvas.width  = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    function adjustText() {
        ctx.fillStyle = COLOR;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = FONT_SIZE + "px 'PT Root UI', sans-serif";

        const lines = MESSAGE.split('\n');
        const linesLength = lines.length;
        const maxWidthLine = lines.reduce((acc, l) => {
            if (acc.length < l.length) {
                acc = l;
            }
            return acc;
        }, '');
        const centerHeight = (canvas.height - FONT_SIZE*linesLength + FONT_SIZE)/2

        for (let i = 0; i < linesLength; i++) {
            ctx.fillText(lines[i], canvas.width/2, (centerHeight + i*FONT_SIZE));
        }

        let textWidth = ctx.measureText(maxWidthLine + 10).width;
        if (textWidth === 0) {
            return;
        }
        let minX = canvas.width/2 - textWidth/2;
        let minY = centerHeight - FONT_SIZE/2;
        ctx.fill();
        let data = ctx.getImageData(minX, minY, textWidth, FONT_SIZE * linesLength).data;
        let isBlank = true;
        for (let i=0; i<data.length; i++) {
            if (data[i] !== 0) {
                isBlank = false;
                break;
            }
        }

        if (!isBlank) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          let num = 0;
          let x = 0;
          let y = 0;
          let w = Math.floor(textWidth);
          let h = Math.floor(FONT_SIZE * linesLength);
          POINTS = [];

          for (let i = 0; i < w; i += INDENT) {
            for (let j = 0; j < h; j += INDENT) {
              num = 4 * (j * w + i);
              if (data[num + 3] > 0) {
                x = w / 2 - i % w;
                y = FONT_SIZE * linesLength / 2 - Math.floor(num / w / 4);
                POINTS.push(new Point(x, y, data[num], data[num + 1], data[num + 2], data[num + 3]));
              }
            }
          }
          MOVED_O = Array.apply(null, Array(POINTS.length)).map(function () {return null;});
        }
    }

    function init() {
        resizeCanvas();
        adjustText();
        animate();
    }

    function animate() {
        update();
        draw();
        setInterval(() => {
          draw();
          update();
        }, 25);
    }

    function update() {
        for (let i=0; i<POINTS.length; i++) {
            POINTS[i].selfMove(i)
        }
    }

    function draw() {
        for (let i=0; i<moved_length; i++) {
            MOVED[i].clear();
        }
        MOVED = MOVED_O;
        moved_length = 0;

        for (let i=0; i<MOVED.length; i++) {
            POINTS[i].draw();
        }
    }

    return {init, cleanCanvas}
}