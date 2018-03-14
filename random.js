$(function() {
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r) {
		if(this.getStatus() == BMAP_STATUS_SUCCESS) {
			var point = r.point;
			var local = new BMap.LocalSearch(point, {
				pageCapacity: 100,
				onSearchComplete: function(data) {
					console.log(data);
					var arrays = data.zr;
					for(var int = 0; int < arrays.length; int++) {
						var d = arrays[int];
						console.log(d.title);
						list.push(d.title);
					}
					$("#loading").hide();
				}
			});
			local.searchNearby("小吃", point, 1000);
		} else {
			alert("定位失败");
		}
	}, {
		enableHighAccuracy: true
	})
	var list = [];
	var run = 0,
		heading = $("h1"),
		timer;

	$("#start").click(function() {
		//      var list = $("#list").val().replace(/ +/g, " ").replace(/^ | $/g, "").split(" ");
		if(list.length == 0) {
			alert("定位失败，未获取到周边数据");
		}
		if(!run) {
			heading.html(heading.html().replace("吃这个！", "吃什么？"));
			$(this).val("停止");
			timer = setInterval(function() {
				var r = Math.ceil(Math.random() * list.length),
					food = list[r - 1];
				$("#what").html(food);
				var rTop = Math.ceil(Math.random() * $(document).height()),
					rLeft = Math.ceil(Math.random() * ($(document).width() - 50)),
					rSize = Math.ceil(Math.random() * (37 - 14) + 14);
				$("<span class='temp'></span>").html(food).hide().css({
					"top": rTop,
					"left": rLeft,
					"color": "rgba(0,0,0,." + Math.random() + ")",
					"fontSize": rSize + "px"
				}).appendTo("body").fadeIn("slow", function() {
					$(this).fadeOut("slow", function() {
						$(this).remove();
					});
				});
			}, 50);
			run = 1;
		} else {
			heading.html(heading.html().replace("吃什么？", "吃这个！"));
			$(this).val("不行，换一个");
			clearInterval(timer);
			run = 0;
		};
	});

	document.onkeydown = function enter(e) {
		var e = e || event;
		if(e.keyCode == 13) $("#start").trigger("click");
	};

	$i = 0;
	$('#start').click(function() {
		$i++;
		if($i >= 6) {
			$('#start').hide();
			$('#stop').show();
		}
	})
	$('#stop').click(function() {
		alert('这么作？今天别吃了！')
		$(this).hide();
	})
});