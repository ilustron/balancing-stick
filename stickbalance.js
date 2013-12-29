

//theta toma el valor NaN después de llamar a mouse.speed()!!!!!!!!

var mouse = {  

    n: 0,

    track: function(e) {  
        this.x=e.clientX;
        this.y=e.clientY;
	document.getElementById("framestick").style.left = this.x - 400 + 'px';
    },
    
    speed: function() {

	
        t = new Date().getTime();
	x = this.x;
	y = this.y;

	if (this.n == 0) {
	    this.x0 = x;
	    this.t0 = t;
	    this.Vx0 = 0; 
            this.Vy0 = 0;
	    this.ax = 0;
	    this.ay = 0;
	    this.n++;
	}
	else if (t != this.t0) {

            dx = x - this.x0; 
            dy = y - this.y0;
            dt = t - this.t0;
	    
            Vx = dx / dt;
            Vy = dy / dt;
            
            dVx = Vx - this.Vx0;
            dVy = Vy - this.Vy0;
	    
            this.ax = dVx / dt;
            this.ay = dVy / dt;

	    this.Vx0 = Vx; 
            this.Vy0 = Vy;
	    
	    
            this.x0 = x; 
            this.y0 = y;
            this.t0 = t;
	    this.n++;
	}
	else{
	    this.x0 = x;
	}
    },
};

function addevents()
{
    region = document.getElementById('MouseRegion');
    region.addEventListener('mousemove', function(event){mouse.track(event);});
    region.addEventListener('click', function(){animationStart();});
}

var stick = {
    
    theta: 0.0,
    Vtheta: 0.01,
    h: 0.005,
    g: 9.8,
    l: 5, 

    f: function(angle) {
	return (this.g /this.l )*Math.sin(angle) + ((200.0 * mouse.ax)/this.l) * Math.cos(angle);	
    },
    
    RungeKutta: function() {

	k1 = this.h* this.Vtheta;
	l1 = this.h* this.f(this.theta);

	k2 = this.h*(this.Vtheta + 0.5*l1);
	l2 = this.h*this.f(this.theta + 0.5*k1);
	
	k3 = this.h*(this.Vtheta + 0.5*l2);
	l3 = this.h*this.f(this.theta + 0.5*k2);
	
	k4 = this.h*(this.Vtheta + l3);
	l4 = this.h*this.f(this.theta + k3);
	
	this.theta = this.theta + (k1 + 2.0*k2 + 2.0*k3 + k4)/6;
	this.Vtheta = this.Vtheta + (l1 + 2.0*l2 + 2.0*l3 + l4)/6;
    },
};

function drawer() {
    var ImgGroup = document.getElementById("SVGroup");
    deg = stick.theta * (180 / Math.PI);
    ImgGroup.setAttribute("transform","rotate(" + deg + ",400,400)");
    mouse.speed();
    console.log(mouse.ax);
    stick.RungeKutta();
}

var animationId = null;

function animationStart() {
    if(animationId)
    {
	clearInterval(animationId);
	animationId = null;
    }
    else
    {
	animationId = setInterval(drawer, 5);
    }
};
