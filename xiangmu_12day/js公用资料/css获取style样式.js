//获取css样式属性值
				function getStyle(obj, attr){
					if (window.getComputedStyle) {
						return getComputedStyle(obj, null)[attr];
					}
					return obj.currentStyle[attr];
				}
  