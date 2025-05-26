export class CanvasDrawer {
    constructor() {
        this.canvas = document.getElementById("battery-canvas");
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext("2d");
        if (!this.ctx) return;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.x = 50;
        this.y = 40;
        this.w = 200;
        this.h = 70;
        this.radius = 10;
        this.white = "#ffffff"
        this.lightGrey = "#cccccc"
        this.grey = "#666666"
        this.green = '#4caf50';
        this.yellow = '#ffc107';
        this.red = '#f44336';
    }

    drawBatteryAnimation(currentLevel, targetLevel) {
        let animatedLevel = currentLevel;
        const loopInterval = () => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.save();
            this.drawBatteryOutline();
            this.ctx.clip();
            const fillWidth = 2 * animatedLevel;
            this.ctx.fillStyle = animatedLevel >= 70 ? this.green : animatedLevel >= 30 ? this.yellow : this.red;
            this.ctx.fillRect(this.x, this.y, fillWidth, this.h);
            this.ctx.restore();
            this.drawBatteryHead();
            this.fillText(currentLevel, targetLevel);
            if (animatedLevel >= targetLevel) {
                setTimeout(() => {
                    animatedLevel = 0;
                }, 700);
            } else {
                animatedLevel += 0.2;
            }
            requestAnimationFrame(loopInterval);
        };
        requestAnimationFrame(loopInterval);
    }

    fillText(currentLevel, targetLevel) {
        this.ctx.fillStyle = this.grey;
        this.ctx.font = "14px Arial";
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "left";
        this.ctx.fillText(`Ladung: ${currentLevel}%`, this.x, 125);
        this.ctx.textAlign = "right";
        this.ctx.fillText(`Ziel: ${targetLevel}%`, this.x + this.w, 125);
    }

    drawBatteryOutline() {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = this.white;
        this.ctx.fillStyle = this.lightGrey;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + this.radius, this.y);
        this.ctx.lineTo(this.x + this.w - this.radius, this.y);
        this.ctx.quadraticCurveTo(this.x + this.w, this.y, this.x + this.w, this.y + this.radius);
        this.ctx.lineTo(this.x + this.w, this.y + this.h - this.radius);
        this.ctx.quadraticCurveTo(this.x + this.w, this.y + this.h, this.x + this.w - this.radius, this.y + this.h);
        this.ctx.lineTo(this.x + this.radius, this.y + this.h);
        this.ctx.quadraticCurveTo(this.x, this.y + this.h, this.x, this.y + this.h - this.radius);
        this.ctx.lineTo(this.x, this.y + this.radius);
        this.ctx.quadraticCurveTo(this.x, this.y, this.x + this.radius, this.y);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    }

    drawBatteryHead() {
        this.ctx.fillStyle = this.lightGrey;
        this.ctx.fillRect(250, 60, 10, 30);
    }
}