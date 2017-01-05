
var citylistObj = Object.create(addressObj);

var citylistObj = $.extend(citylistObj,{
	namr:'城市选择页',
	dom: $('#citylist'),
	init:function(){
		this.load();
	},
	load:function(){

		$.ajax({

			url:'/v1/cities',
			data:{
				'type':'hot'
			},
			type:'GET',
			success:function(res){
				
				var html = '';

				for(var i = 0; i < res.length; i++){

					html += '<li><a href="javascript:;">'+ res[i].name +'</a></li>'

				}

				$('.hc_list').html(html);
			}
		});


		$.ajax({

			url:'/v1/cities',
			data:{
				'type':'group'
			},
			type:'GET',
			success:function(res){
				
				// var html = '';
				var arr = [];
				$.each(res,function(i,val){

					arr.push([i,val]);

				});

				var arr = arr.sort(function(a,b){
					// console.log(a[0].charCodeAt(0),b[0].charCodeAt(0));
					return a[0].charCodeAt(0) - b[0].charCodeAt(0);

				});

				for(var i = 0; i < arr.length; i++){

					var $item = $('<div>');
					$item.addClass('item');
					var $h2 = $('<h2>');
					$h2.html(arr[i][0]);
					if(i == 0){

						var $span = $('<span>');

						$span.html('(按字母排序)');

						$h2.append($span);
					}
					$item.append($h2);
					var $oul = $('<ul>');
					$oul.addClass('item_list');
					var html = '';

					console.log(arr[i][1]);
					for(var j = 0; j < arr[i][1].length; j++){

						html += '<li><a href="javascript:;">'+ arr[i][1][j].name +'</a></li>';

					}

					$oul.html(html);
					$item.append($oul);

					$('.citys').append($item);

				}

			}
		});

	}
})

// console.log(citylistObj);