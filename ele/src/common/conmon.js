//图片路径处理
export function handleUrl(imageUrl){
	if(imageUrl){
		return 'https://fuss10.elemecdn.com/'
			+imageUrl+
			(imageUrl.endsWith('jpeg')?'.jpeg':'.png');
	}else{
		return ''
	}
}