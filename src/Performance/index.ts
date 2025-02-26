//获取Performance 参数信息
/*
if(window.performance){
    console.log(window.performance.timing)
    //performance.getEntriesByType(type)
    console.log(window.performance.getEntriesByType('navigation')) //导航相关的参数信息
  console.log(performance.getEntriesByName("first-paint"),'wefwe')
    let LCP;
// 增加一个性能条目的观察者
    new PerformanceObserver((entryList, observer) => {
        let perEntries = entryList.getEntries();
        LCP = perEntries[0];
        console.log(LCP,'LCP')
        observer.disconnect(); // 不再观察
    }).observe({ entryTypes: ["largest-contentful-paint"] });


    let FMP;
// 增加一个性能条目的观察者
    new PerformanceObserver((entryList, observer) => {
        let perEntries = entryList.getEntries();
        FMP = perEntries[0];
        console.log(FMP,'FMP')
        observer.disconnect(); // 不再观察
    }).observe({ entryTypes: ["element"] }); // 观察页面中有意义的元素


    const {
        domContentLoadedEventEnd,
        domContentLoadedEventStart
    } = window.performance.timing;
    let DCL = domContentLoadedEventEnd - domContentLoadedEventStart;

   console.log(DCL,'1212')
}*/
// let pageNumber =0;
// window.addEventListener('error',(e)=>{
//     if(e.target&&(e.target.src||e.target.href)){
//         console.log(e.target,'error')
//     }
// })
// // 监听 promise 错误
// window.addEventListener("unhandledrejection", (evt) => {
//     //  promise 错误数据处理上报操作
//     console.log(evt,'wefwefwfwe')
// });
// //检测白屏
// const startTime =  window.performance.now()
// window.addEventListener('DOMContentLoaded',()=>{
//       const time =  window.performance.now() - startTime
//     console.log(time,'time-timwe')
// })
// window.addEventListener('load',()=>{
//     pageNumber++
//     console.log(pageNumber)
// })
// const startTimes = Date.now(); // 记录进入页面的时间戳
// window.addEventListener("beforeunload", function(event) {
//     const endTime = Date.now(); // 记录离开页面的时间戳
//     const timeSpent = endTime - startTimes; // 计算停留时间
//     // 返回一个字符串来触发浏览器的确认对话框
//     event.returnValue = "Are you sure you want to leave?";
//     console.log(timeSpent, 'timeSpent');
//
//
// });
