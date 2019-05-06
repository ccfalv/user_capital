window.onload = function() {
//tabs 
var tabs = new Tabby('[data-tabs]');
 
//progress circle 

(function($) {
  $('#circle-container').circleProgress({
    value: 0.00,
    size: 120,
    startAngle: 2.3,
    thickness:18,
    animation:100,
    emptyFill:"rgba(54, 58, 78,1)",
    fill: {
      gradient: ["#24bb77","#24bbb4","#24aeb6","#246bba","#5636bb","#7a29bb"]
    }
  }).on('circle-animation-progress', function(event, progress, stepValue) {
    $(this).find('strong').text(stepValue.toFixed(2).substr(2));
  });
  })(jQuery);
  $(".account-tile").on({
    mouseenter: function () {
        $('#circle-container').circleProgress('value', 0.10);
    },
    mouseleave: function () {
        $('#circle-container').circleProgress('value', 0.00);
    }
  });
  $( ".primary-btn" ).click(function() {
      $('#circle-container').circleProgress('value', 0.10);
  });

 // Add values to the values array and see what happens :)
	var values = [0,10,20,30,40,50,60,70,80,90,100,110,120];

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
		  left += (barwidth+padding+10);
		}
	}

 };


