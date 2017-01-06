var rlistObj = Object.create(addressObj);

var rlistObj = $.extend(rlistObj,{
	namr:'餐厅列表页',
	dom: $('#rlist'),
	init:function(){
		this.loadSj();
	},
	loadSj:function(){

		console.log(1);

		$.ajax({
			url:'/shopping/restaurants',
			data:{
				latitude:45.77813,
				longitude:126.61776,
				offset:0,
				limit:20,
				extras:'[activities]'
			},
			success:function(res){

				console.log(res);

				var str = '';
				for(var i = 0; i < res.length; i++){

					
					
				}

			},
			error:function(){
				console.log('获取数据错误');
			}
		});
	}
})

// console.log(citylistObj);