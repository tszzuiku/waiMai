var addressObj = {

	namr:'地址搜索页',
	dom: $('#address'),
	init:function(){

		this.addEvent();

	},
	addEvent:function(){

		// alert(2);

		$btn1 = $('#address .btn').eq(0);
		$btn2 = $('#address .btn').eq(1);

		//console.log(1);

		$btn1.on('click',function (){

			var kw = $('#address').find('input').eq(0).val();

			$.ajax({

				url:'/v1/pois',
				data:{
					'city_id':1,
					'keyword':kw,
					'type':'search'
				},
				type:'GET',
				success:function(res){

					var html = '';

					for(var i = 0; i < res.length; i++){

						html += res[i].name + '<br/>' + res[i].address + '<br/>';

					}

					$('.cons').html(html);

				}

			});
		});

		$btn2.on('click',function (){
			// console.log(2);
			var kw = $('#address').find('input').eq(0).val();

			$.ajax({

				url:'/a',
				data:{
					qt:'poisug',
					wd:kw,
					cid:289,
					b:'',
					type:0,
					newmap:1,
					ie:'utf-8',
				},
				dataType:'json',
				success:function(res){

					console.log('成功了');

					var html = '';

					for(var i = 0; i < res.s.length; i++){

						html += res.s[i] + '<br/>';

					}

					$('.cons').html(html);

				},
				error:function(){
					console.log('失败了');
				}

			});
		});
		
	},
	enter:function(){

		this.dom.show();

	},
	leave:function(){

		this.dom.hide();

	}

}