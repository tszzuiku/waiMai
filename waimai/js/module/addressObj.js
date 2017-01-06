var addressObj = {

	namr:'地址搜索页',
	dom: $('#address'),
	init:function(){

		this.addEvent();

	},
	changeCity:function(hash){
		// 获取城市名称、城市id（给ajax使用）
		this.cname = hash.split('-')[1] || '上海';
		this.cid = hash.split('-')[2] || 1;
		this.bid = hash.split('-')[3] || 289;

		$('#cn').html(decodeURI(this.cname));

	},
	addEvent:function(){
		var _this = this;
		$btn1 = $('#address .btn').eq(0);
		$btn2 = $('#address .btn').eq(1);
		// 饿了么搜索
		$btn1.on('click',function (){
			var kw = $('#address').find('input').eq(0).val();
			// console.log(_this.cid);
			$.ajax({
				url:'/v1/pois',
				data:{
					'city_id':_this.cid || 1,  //给第一次进入页面坐下判断
					'keyword':kw,
					'type':'search'
				},
				type:'GET',
				success:function(res){
					console.log(res);
					var html = '';
					for(var i = 0; i < res.length; i++){
						// html += res[i].name + '<br/>' + res[i].address + '<br/>';

						html += '<li><a href="#rlist-'+ res[i].latitude +'-'+ res[i].longitude +'"><span>'+ res[i].name +'</span><i>'+ res[i].address +'</i></a></li>';
					}
					$('.cons-list').html(html);
				}
			});
		});
		// 百度外卖搜索
		$btn2.on('click',function (){
			// console.log(2);
			var kw = $('#address').find('input').eq(0).val();

			$.ajax({

				url:'/a',
				data:{
					qt:'poisug',
					wd:kw,
					cid:_this.bid || 289,   //给第一次进入页面坐下判断
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