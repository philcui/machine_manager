export default function(data, target){
  let res = data.find((item, index) => {
    return item.value == target
  })
  if(res){
    return res.name
  }else{
    return ""
  }
}