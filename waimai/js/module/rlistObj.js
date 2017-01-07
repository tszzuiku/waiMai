var rlistObj = Object.create(addressObj);

var rlistObj = $.extend(rlistObj,{
	namr:'餐厅列表页',
	dom: $('#rlist'),
	init:function(){
		
		this.load_banner();

	},

	load_banner:function(){

		var _this = this;

		$.ajax({

			url:'/v2/index_entry?geohash=wtw3sz12gtp&group_type=1&flags=[F]',
			success:function(res){

				_this.num = Math.ceil(res.length / 8);

				_this.clientWidth = $(window).width() ;

				$('.banner-cons').width(_this.clientWidth * _this.num+ 'px');

				var str = '';

				var str1 = '';

				for(var i = 0; i < _this.num; i++){

					str += '<li class="bc-item">';

					for(var j = i*8; j < (i+1)*8; j++){

						if(j < res.length){
							str += '<a class="bl-item" href="javascript:;"> \
									<div class="bl-item-img">\
										<img src="//fuss10.elemecdn.com'+ res[j].image_url +'?imageMogr/format/webp/" alt="">\
									</div>\
									<span class="bl-item-txt">'+ res[j].title +'</span>\
								</a>';
						}
					}

					str += '</li>';

					if(i ==0 ){
						str1 += '<li class="active"></li>';
					}
					else{
						str1 += '<li></li>';
					}
				}
				
				$('.banner-cons').append(str);
				$('.banner-index').append(str1);

				_this.loadSj();

				_this.banner_change();
			},
			error:function(){

				console.log('获取数据错误');
			}

		});

	},
	banner_change:function(){

		var _this = this;

		this.page = 0;

		$('.banner-cons').on('touchstart',function(event){

			var event = window.event || event;
			var touch = event.touches[0];

			var startX = touch.clientX;
			var startY = touch.clientY;

			_this.banX = $('.banner-cons').position().left;

			// console.log(banX)

			$('.banner-cons').on('touchmove',function(event){
				var event = window.event || event;
				var touch = event.touches[0];
				// console.log(touch);
				_this.moveX = touch.clientX;
				var moveY = touch.clientY; 

				_this.disX = _this.moveX - startX;
 
				_this.moveLeft = _this.disX + _this.banX;

				if(_this.moveLeft > 0){
					_this.moveLeft = 0;
				}
				else if (_this.moveLeft < -_this.clientWidth){
					_this.moveLeft = -_this.clientWidth;
				}
	

				console.log(_this.moveLeft);

				$(this).css('left', _this.moveLeft + 'px');

			});

			$('.banner-cons').on('touchend',function(event){

				// console.log(_this.disX,-_this.clientWidth/3)

				if(_this.disX < -_this.clientWidth/3){

					_this.page += 1;

					console.log(_this.num-1);

					_this.page = _this.page > _this.num-1 ? _this.num-1 : _this.page;

					

				}
				else if (_this.disX > _this.clientWidth/3){

					_this.page -= 1;

					_this.page = _this.page < 0 ? 0 : _this.page;

				}

				_this.moveLeft = -_this.page*_this.clientWidth;

				$('.banner-index').children('li').eq(_this.page).addClass('active').siblings().removeClass('active');

				$('.banner-cons').animate({'left': _this.moveLeft + 'px'});

			});

		});

	},
	coordinate:function(hash){

		this.x = hash.split('-')[1];
		this.y = hash.split('-')[2];

		this.flag = true;
		this.index = 0;

	},
	loadSj:function(){

		var _this = this;

		$.ajax({
			url:'/shopping/restaurants',
			data:{
				latitude:this.x,
				longitude:this.y,
				offset:_this.index,
				limit:20,
				extras:'[activities]'
			},
			success:function(res){

				var str = '';
				for(var i = 0; i < res.length; i++){

				// 图片地址处理
					var a = res[i].image_path.substring(0,1);
					var b = res[i].image_path.substring(1,3);
					var c = res[i].image_path.substring(3);
					var d = '';
					var e = '';
					if(res[i].image_path.indexOf('jpeg') != -1 ){
						d = res[i].image_path.substring(res[i].image_path.length-4);
					}
					else if(res[i].image_path.indexOf('png') != -1 ){
						d = res[i].image_path.substring(res[i].image_path.length-3);
					}
					else if(res[i].image_path.indexOf('jpg') != -1 ){
						d = res[i].image_path.substring(res[i].image_path.length-3);
					}

				// 配送费
					if(res[i].float_delivery_fee == 0){
						e = '免费配送';
					}
					else{
						e = '配送费￥<em>'+ res[i].float_delivery_fee +'</em>';
					}
				// 字符串拼接
					str += '<div class="rl-item">	\
								<div class="rl-item-l">\
									<img class="logo" src="//fuss10.elemecdn.com/'+ a +'/'+ b +'/'+ c +'.'+ d +'?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/">\
								</div>\
								<div class="rl-item-r">\
									<h3>'+ res[i].name +'</h3>\
									<div class="pj">\
										<span class="star-icon">\
											<i></i>\
											<i></i>\
											<i></i>\
											<i></i>\
											<i></i>\
										</span>\
										<span class="star">'+ res[i].rating +'</span>\
										<span class="sale-mount">月售<em>'+ res[i].recent_order_num +'</em>单</span>\
									</div>\
									<p class="fy">\
										<span class="fy-l">￥<i>'+ res[i].regular_customer_count +'</i>起送/<b>'+ e +'</b></span>\
										<span class="fy-r"><i>'+ (res[i].distance/1000).toFixed(2) +'</i>km / <b><em>'+ res[i].order_lead_time +'</em>分钟</b></span>\
									</p>\
								</div>\
							</div>'
					
				}

				$('.rl-item-list').append(str);

				_this.slideDown();
				_this.flag = true;
			},
			error:function(){
				console.log('获取数据错误');
			}
		});
	},

	slideDown:function(){
		var _this = this;
		$(document).on('scroll',function(){
			var clientHeight = $(window).height();//获取窗口高度
			var moreT = $(".more").offset().top;//获取滚动条高度，[0]是为了把jq对象转化为js对象
			var scrollT = $("body").scrollTop();//滚动条距离顶部的距离
			
			// console.log(clientHeight,scrollT,moreT)
			if(scrollT+clientHeight>=moreT){//当滚动条到顶部的距离等于滚动条高度减去窗口高度时
				// queryMailList();

				if(_this.flag){

					_this.flag = false;

					_this.index += 20;

					console.log(_this.index);

					_this.loadSj();
				}
			}
		});
	}


})

// console.log(citylistObj);