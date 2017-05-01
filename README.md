# 轮播图插件
## 这是一个用jQuery框架写的轮播图组件;

### 只需在页面手动添加一个标签就可以

### 使用方法

#### 引用js文件夹里的carousel.js jquery文件和public.cc文件到你的页面。(样式可以自行修改);
		
		<link rel="stylesheet" href="css/public.css">
		<script src="js/jquery-1.11.1.min.js"></script>
		<script src="js/carousel.js"></script>

#### 在引用页面上添加一个容器标签(类名可以自定义，但要跟后面传的参数保持一致);

	<div class="carousel"></div>

### 实例化carousel.js的Carousel函数
	
	Carousel = function(anguments){};
	anguments是一个对象
        anguments  =  {
               container:'.carousel',
               data: data,
               width: 960,
               height: 300,
               time: 500
             }
	     
        * container：选择一个容器标签的类名，与页面添加的保持一致
	* data 是一个数组，接受后台传递的数据
	* width 传入轮播图的宽度，可选，默认为100%(满屏);
	* height 传入轮播图的高度，可选，默认自适应
        * time 每张图片轮播时间间隔
		

#### 实例化	
		模拟了后台传过来的数据data(这里只有一个src属性);
		var data =[{src:'banner01.jpg'},{src:'banner02.jpg'},{src:'banner03.jpg'}];
		var car = new Carousel({
                           container:'.carousel',
                           data: data,
                           width: 960,
                           height: 300,
                           time: 500
                });

### 展示效果 <a href="https://newyoung21.github.io/carousel/">狠狠的点击这里demo</a>
