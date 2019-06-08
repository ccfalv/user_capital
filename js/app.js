window.onload = function() {
//tabs 
var tabs = new Tabby('[data-tabs]');
 
//progress circle 

(function($) {
  $('#circle-container').circleProgress({
    value: 0.00,
    size: 124,
    startAngle: 2.3,
    thickness:22,
    animation:100,
    emptyFill:"#4C5B6D",
    fill: "#C3EAFF"
  }).on('circle-animation-progress', function(event, progress, stepValue) {
    $(this).find('strong').text(stepValue.toFixed(2).substr(2));
  });
  })(jQuery);
  $(".account-tile").on({
    mouseenter: function () {
        $('#circle-container').circleProgress('value', 0.09);
    },
    mouseleave: function () {
        $('#circle-container').circleProgress('value', 0.00);
    }
  });
  $( ".primary-btn.spending-btn" ).click(function() {
      $('#circle-container').circleProgress('value', 0.50);
  });

 // Add values to the values array and see what happens :)
	var values = [0,5,5,5,5,5,10,10,10,10,15,15,15,20,20,20,20,25,25,25,30,30,35,35,40,40,45,45,50,50,50,60,60,60,60,60,70,70,70,70,80,80,90,90,100,100,100,100,110,120,130];

	drawChart(values,"#chart",10) // You can adjust the margin between each bar by changing 10 to whatever you like

	function drawChart(data,selector,padding){
	  var max = Math.max.apply(Math, data);
		var chart = document.querySelector(selector);
		var barwidth = ((chart.offsetWidth-(values.length-1)*padding-(data.length)*10)/data.length);
		var sum = data.reduce(function(pv, cv) { return pv + cv; }, 0);
		var left = 0;
		for (var i in data){
		  var newbar = document.createElement('div');
		  newbar.setAttribute("class", "bar");
		  newbar.style.width=barwidth+"px";
		  newbar.style.height=((data[i]/max)*100)+"%";
		  newbar.style.left=left+"px";
		  chart.appendChild(newbar);
		  left += (barwidth+padding+11);
		}
	}

 };


