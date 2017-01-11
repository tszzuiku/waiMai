var detailObj = Object.create(addressObj);

var detailObj = $.extend(detailObj,{
	namr:'餐厅详情页',
	dom: $('#detail'),
	init:function(){

		this.bindEvent();

	},
	fly:function(event,curObj){

		var ev = window.event || event;

		var offset = $(".shopcar").offset();

		var addcar = curObj; 
   	 	// var img = addcar.parent().siblings('a').find('img').attr('src'); 
    	var flyer = $('<div class="u-flyer"></div>'); 
    	// console.log(66666666666)
    	flyer.fly({ 
            start: { 
                left: ev.clientX, //开始位置（必填）#fly元素会被设置成position: fixed 
                top: ev.clientY //开始位置（必填） 
            }, 
            end: { 
                left: offset.left+20, //结束位置（必填） 
                top: offset.top+50, //结束位置（必填） 
                width: 0, //结束时宽度 
                height: 0 //结束时高度 
            }, 
            onEnd: function(){ //结束回调 
                
            	console.log('飞成功了');

            	$('.shopcar').addClass('shake');

            	var o = $('.shopcar').get(0);

            	o.addEventListener("webkitAnimationEnd", function() {
				    console.log("动画结束");
				    $('.shopcar').removeClass('shake');
				})

            } 
        }); 


	},
	bindEvent:function(){
		var _this = this;
		// 点击左侧边栏，跳到指定内容
		$('.d_con_l').on('click','li',function(event){

			

			var val = $(this).text();

			$(this).addClass('active').siblings().removeClass('active');
			
			var scrollToObj = $('[data-name='+ val +']')[0];  //必须是一个对象，不能是一个对象数组。
			rightScroll.scrollToElement(scrollToObj,500);
			// rightScroll.scrollToElement(curelem, 500);
		});

		$(".d_con_r").on('click', '.plus', function(event){

			_this.fly(event,$(_this));

			var num = Number($(this).siblings('.mounts').text());

			num++;

			console.log(num);

			if(num >= 1){

				$(this).siblings().show();

			}

			$(this).siblings('.mounts').html( num );

			_this.changePrice();
		});

		$(".d_con_r").on('click', '.imon', function(event){

			var num = Number($(this).siblings('.mounts').text());

			num--;

			num = num < 0 ? 0 : num;

			if(num <= 0){

				$(this).hide().siblings('.mounts').hide();

			}


			$(this).siblings('.mounts').html( num);

			_this.changePrice();

		});

	},
	changePrice:function(){

		if(this.scale()[0] > 0){

			$('.shopcar').find('i').show();

			$('.shopcar').addClass('active');

		}
		else{

			$('.shopcar').find('i').hide();

			$('.shopcar').removeClass('active');
		}

		$('.sum_price span').html(this.scale()[1]);

		$('.shopcar').find('i').html(this.scale()[0]);

	},
	scale:function(){

		var $aDcr_item = $('.dcr_item');

		var arr = [];

		this.sum_mounts = 0;

		this.sum_price = 0;

		for(var i = 0; i < $aDcr_item.length; i++){

			var cur_num = Number( $aDcr_item.eq(i).find('.mounts').html() );

			var cur_price = Number( $aDcr_item.eq(i).find('.single_price').html() );

			this.sum_mounts += cur_num;

			this.sum_price += cur_num * cur_price;

		}

		// console.log(this.sum_mounts)

		arr.push(this.sum_mounts);
		arr.push(this.sum_price.toFixed(1));

		return arr;

	},
	load:function(hash){

		this.id = hash.split('-')[1];
		this.lat = hash.split('-')[2];
		this.lon = hash.split('-')[3];

		this.load_header();
		this.load_con();
	},
	load_header:function(){

		$.ajax({
			url:'/shopping/restaurant/'+this.id,
			data:{
				extras:['activities','album','license','identification','statistics'],
				latitude:this.lat,
				longitude:this.lon,
			},
			success:function(res){

				console.log(res);

				var a = res.image_path.substring(0,1);
				var b = res.image_path.substring(1,3);
				var c = res.image_path.substring(3);
				var d = res.image_path.substring(32);

				$('.logo').attr('src','https://fuss10.elemecdn.com/'+ a +'/'+ b +'/'+ c +'.'+ d +'?imageMogr/quality/80/format/webp/');
				$('.td_server_time').html(res.order_lead_time);
				$('.td_server_price').html(res.float_delivery_fee);
				$('.tips').find('a').text(res.promotion_info);
				$('.title_detail h2').html(res.name);
			},
			error:function(){
				console.log('请求数据错误');
			}
		});
	},
	load_con_list:function(list){

		// console.log(list);

		var str = '';

		for(var i = 0; i < list.length; i++){

			var a = list[i].image_path.substring(0,1);
			var b = list[i].image_path.substring(1,3);
			var c = list[i].image_path.substring(3);
			var d = list[i].image_path.substring(32);


			str += '<li>'+
						'<img src="//fuss10.elemecdn.com/'+ a +'/'+ b +'/'+ c +'.'+ d +'?imageMogr/thumbnail/140x140/format/webp/quality/85" alt="">'+
						'<div class="goods_detail">'+
							'<h4>'+ list[i].name +'</h4>'+
							'<span class="ms">'+ list[i].description +'</span>'+
							'<p>'+
								'月售<span>'+ list[i].month_sales +'</span>  好评率<i>'+ list[i].satisfy_rate +'</i>%'+
							'</p>'+
							'<div class="bottom">'+
								'<span>￥<b class="single_price">'+ list[i].specfoods[0].price +'</b></span>'+
								'<em><i class="imon"></i> <i class="mounts">0</i> <i class="plus"></i></em>'+
							'</div>'+
						'</div>'+
					'</li>';

		};

		return str;

	},
	
	load_con:function(){
		var _this = this;
		// console.log(1);
		$.ajax({

			url:'/shopping/v2/menu?restaurant_id='+this.id,
			success:function(res){
				console.log(res);

					var str_l = '';
					var str_r = '';

				for(var i = 0; i < res.length; i++){

					str_l += '<li>'+ res[i].name +'</li>';

					str_r += '<div class="dcr_item" data-name="'+ res[i].name +'">'+
									'<h3>'+ res[i].name +'</h3>'+
									'<ul>'+
										_this.load_con_list(res[i].foods) +
									'</ul>'+
								'</div>';

				}

				$('.dcr_wrapper').html(str_r);
				$('.dcl_list').html(str_l);

				$('.dcl_list li').eq(0).addClass('active');

			// 滚动条事件
				window.leftScroll = new IScroll('.d_con_l', {
					scrollbars: true, //不显示滚动条
					preventDefault: false, //不阻止点击事件
					bounce: false //不让其弹动
				});
				window.rightScroll = new IScroll('.d_con_r', {
					scrollbars: false,
					probeType: 3,  //设置滚动条的灵敏度,监听滚动的事件
					preventDefault: false,  //不阻止点击事件
					bounce: true
				});

				
				// 商品列表滚动事件
				_this.cacheMaplist = [];
				var sum = 0;
				
				$('.dcr_item').each(function(index, elem){
				  console.log($(elem).height())
				  sum += $(elem).height();
				  _this.cacheMaplist.push(sum);
				});

				var leftItem = $('.dcl_list').find('li');
				rightScroll.on('scroll', function(event){

					console.log('滚动中');
					// console.log(rightScroll);

					var scrollT = Math.abs(rightScroll.y);

					var index = 0;

					// console.log(11111111111)

					for(var i =0; i < _this.cacheMaplist.length; i++) {
						
						if(Math.abs(rightScroll.y) <= _this.cacheMaplist[i] - 1) {
							leftItem.removeClass('active');
							leftItem.eq(i).addClass('active');
							break;
						}
					}

					

				});

				

			},
			error:function(){
				console.log('请求数据错误');
			}
		});

	}
})

// console.log(citylistObj);

