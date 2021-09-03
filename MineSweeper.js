function setup() 
{
  createCanvas(380, 230);
  background(220);
}


function draw() 
{
  drawField();
}


function calcCords(column, row)
{
  
}

function drawField()
{
  for(var i=5;i<375;i+=25)
  {   
    for(var j=5;j<225;j+=25)
    {
      stroke(0);
      strokeWeight(0.1);
      square(i,j,20);
    }
  }
}
