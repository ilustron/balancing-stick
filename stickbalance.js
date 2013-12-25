
var x = 0;
var y = 0;

var x_old = 0;
var y_old = 0;

var t = 0;
var t_old = 0; 

var vx = 0;
var vx_old = 0;

var vy = 0;
var vy_old = 0;

var ax = 0;


function tracker(e)
{
    x=e.clientX;
    document.getElementById("framestick").style.left = x - 400 + 'px';
}

function addevents()
{
    region = document.getElementById('balancedzone');
    region.addEventListener('mousemove', function(event){tracker(event);});
    region.addEventListener('click', function(){animationStart();});
}


function printstatus()
{

    d = new Date();
    t = d.getTime();

    dx = x - x_old;
    dt = t -t_old;
    if(dt!=0)
    {
	    vx = dx / dt;    
	    dvx = vx - vx_old;
	    ax = dvx / dt;

	    vx_old = vx;
	    
	    pos="x =" + x ;
	    document.getElementById("position").innerHTML=pos;
	    dur="dt =" + dt;
	    document.getElementById("duracion").innerHTML=dur;
	    dist="dx =" + dx;
	    document.getElementById("distancia").innerHTML=dist;
	    acel="ax =" + ax;
	    document.getElementById("aceleracion").innerHTML=acel;
	    vel="Vx =" + vx; 
	    document.getElementById("velocidad").innerHTML=vel;
    }
    t_old = t;
    x_old = x;
}




var h = 0.003;

var stick = {
    
    init: function(x1,y1,l,theta,vtheta) {
	this.theta = theta;
	this.vtheta = vtheta;
	this.l = l;
	this.x1 = x1;
	this.y1 = y1;
    },
    
    x2: function() {
	return this.x1 + this.l * Math.cos(this.theta);
    },
    
    y2: function() {
	return this.y1 - this.l * Math.sin(this.theta);
    },
    
};



stick.init(400,400,400,1.570796327,(2*Math.random()-1)/10);



function f(alpha,acel) {
    var g=980.0;// 1 metro = 100px
    return -(g/stick.l)*Math.cos(alpha) - 100*acel * Math.sin(alpha);
}

function rungekutta() {
    
    k1 = h*stick.vtheta;
    l1 = h*f(stick.theta,ax);
    
    k2 = h*(stick.vtheta + l1/2);
    l2 = h*f(stick.theta + k1/2,ax);
    
    k3 = h*(stick.vtheta + l2/2);
    l3 = h*f(stick.theta + k2/2,ax);
    
    k4 = h*(stick.vtheta + l3);
    l4 = h*f(stick.theta + k3,ax);
    
    stick.theta = stick.theta + (k1 + 2.0*k2 + 2.0*k3 + k4)/6;
    stick.vtheta = stick.vtheta + (l1 + 2.0*l2 + 2.0*l3 + l4)/6;
}

function drawer() {
    printstatus();
    rungekutta();
    var linestick = document.getElementById("stick");
    
    linestick.setAttribute("x2", stick.x2());
    linestick.setAttribute("y2", stick.y2());
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
	animationId = setInterval(drawer,3);
	drawer();
    }
};
