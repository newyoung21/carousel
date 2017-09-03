" use strict";
Carousel = function(obj) {
	this.init(obj);
};
Carousel.prototype = {
	//初始化
	init: function(aa) {
		this.$c = $(aa.container);
		this.data = aa.data;
		this.L = this.data.length;
		this.width = aa.width || ''; //没有传宽度值，默认给100%
		this.height = aa.height || 'auto';
		this.time = aa.time;
		this.createList();
		this.playGo();
	},
	//创建轮播图列表
	createList: function() {
		//创建ul元素
		var ulElement = $("<ul class='carousel-ul'></ul>");
		this.$c.append(ulElement);
		this.$ul = this.$c.find('.carousel-ul');
		for (var i = 0; i < this.L; i++) {
			var liElement = $("<li data-idx='" + i + "'><a href='"+this.data[i].href+"' target=' _blank'><img src='images/" + this.data[i].src + "' alt='' /></a></li>");
			this.$ul.append(liElement);
		};
		//创建小图标列表
		var $ulIcon = $("<ul class='ul-icon'></ul>");
		this.$c.append($ulIcon);
		this.$ui = this.$c.find('.ul-icon');
		for (var b = 0; b < this.L; b++) {
			if (b == 0) {
				var liIcon = $("<li data-idx='" + b + "' class='active'><a href='javascript:;'></a></li>");
				this.$ui.append(liIcon);
			} else {
				var liIcon = $("<li data-idx='" + b + "'><a href='javascript:;'></a></li>");
				this.$ui.append(liIcon);
			}
		};
		//创建上一页,下一页按钮
		var $next = $("<a class='a-next cro-a'href='javascript:;'>></a>"),
			$prev = $("<a class='a-prev cro-a'href='javascript:;'><</a>");
		this.$c.append($next);
		this.$c.append($prev);
		//暴露变量
		this.$next = this.$c.find('.a-next');
		this.$prev = this.$c.find('.a-prev');
		this.lis = this.$ul.find('li');
		this.imgs = this.lis.find('img');
		this.round = this.$ui.find('li');
		//添加样式 
		this.setCss();
	},
	//给容器和轮播图设置样式
	setCss: function() {
		this.$c.css({
			width: this.width ? this.width : '100%',
			overflow: 'hidden',
			position: 'relative'
		});
		this.$ul.css({
			width: this.width ? (this.L * this.width) : (this.L * 100) + '%',
			height: this.height,
			position: 'relative',
			display: 'table'
		});
		this.lis.css({
			width: (100 / this.L) + '%',
			display: 'table-cell',
			height: this.height
		});
		console.log(this.imgs);
		this.imgs.css({
			display: 'block',
			width: this.width,
			height: this.height
		});
		//绑定事件
		this.bind();
	},
	//绑定事件
	bind: function() {
		var me = this;
		//点击小圆点事件
		this.round.on('mouseenter', function() {
			var idx = $(this).attr('data-idx'),
			now = me.$ui.find('.active').attr('data-idx');
			me.active(idx);
			if (idx > now) {
				me.nextGo(idx - now,true);
			} else if (idx < now) {
				me.prevGo(now - idx,true);
			}
		});
		this.$c.on('mouseenter', function() {
			me.$c.find('.cro-a').toggle();
			clearInterval(me.run);
		});

		this.$c.on('mouseleave', function() {
			me.$c.find('.cro-a').toggle();
			me.playGo();
		});
		this.$next.on('click', function() {
			me.nextGo();
		});
		this.$prev.on('click', function() {
			me.prevGo();
		});
	},
	//下一页轮播
	nextGo: function(i,round) {
		var i = i || 1,
			imgH = this.lis.width(),
			me = this;
		this.$ul.animate({
			left: -(i * imgH)
		}, me.time, function() {
			//把第一个放到最后面
			for (var k = 0; k < i; k++) {
				$(this).find('li').last().after($(this).find('li').first());
			}
			//把ul元素放回初始位置
			$(this).css({
				left: 0
			});
			var nb = $(this).find('li').first().attr('data-idx');
			//小图标选中样式变化
			if(!round){
				me.active(nb);
			}
		});
	},
	//上一页轮播
	prevGo: function(i,round) {
		var i = i || 1,
			imgH = this.lis.width(),
			me = this;
		this.$ul.css({
			left: -(i * imgH)
		});
		for (var k = 0; k < i; k++) {
			this.$ul.find('li').first().before(this.$ul.find('li').last());
		};
		this.$ul.animate({
				left: 0
			}, me.time,
			function() {
				var nb = $(this).find('li').first().attr('data-idx');
				if(!round){
					me.active(nb);
				}
			});
	},
	//初始化播放
	playGo: function() {
		var me = this;
		this.run = setInterval(function() {
			me.nextGo();
		}, 3500);
	},
	//小圆点样式变化
	active: function(nb) {
		this.round.removeClass('active').eq(nb).addClass('active');
	}
};
//封装 jQuery 插件
(function($) {
	$.fn.extend({
		carousel: function (obj){
			obj['container'] = this[0];
			return new Carousel(obj);
		}
	})
})(jQuery)