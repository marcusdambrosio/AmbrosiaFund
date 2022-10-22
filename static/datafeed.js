var dataSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')

const { spawn } = require('child_process');
const trades = []; // Store readings

const sensor = spawn('python', ['get_data.py']);
sensor.stdout.on('data', function(data) {

    // Coerce Buffer object to Float
    trades.push(parseFloat(data))
    console.log(trades);




function reportTrades(trade) {
    process.stdout.write(trade + '\n'); // Write with newline char
    setTimeout(reportTrades, Math.random() * 5000); // Wait 0 to 5 seconds
}


dataSocket.onmessage = function (event) {
    var message = JSON.parse(event.data);
    reportTrades(trade)};





//let csvContent = "data:text/csv;charset=utf-8,"
//    + trades.map(e => e.join(",")).join("\n");
//
//var today = newDate();
//var dd = String(today.getDate()).padStart(2, '0');
//var encodedUri = encodeURI(csvContent);
//var link = document.createElement("a");
//link.setAttribute("href", encodedUri);
//link.setAttribute("download", dd.concat("BTC_datafeed.csv"));
//document.body.appendChild(link); // Required for FF
//console.log()
//link.click();




//candleSeries.setData(response)
//var data = [PUT INITIALIZATION DATA FROM GET HISTORICAL KLINES]
//
//
//
//var lastClose = data[data.length - 1].close;
//var lastIndex = data.length - 1;
//
//var targetIndex = lastIndex + 105 + Math.round(Math.random() + 30);
//var targetPrice = getRandomPrice();
//
//var currentIndex = lastIndex + 1;
//var currentBusinessDay = { day: 29, month: 5, year: 2019 };
//var ticksInCurrentBar = 0;
//var currentBar = {
//	open: null,
//	high: null,
//	low: null,
//	close: null,
//	time: currentBusinessDay,
//};
//
//var binanceSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m')
//binanceSocket.onmessage = function (event) {
//    var message = JSON.parse(event.data);
//    var candlestick = message.k
//
//    candleSeries.update({
//            time: candlestick.t / 1000,
//            open: candlestick.o,
//            high: candlestick.h,
//            low: candlestick.l,
//            close: candlestick.c})
//}
//
//function mergeTickToBar(price) {
//	if (currentBar.open === null) {
//		currentBar.open = price;
//		currentBar.high = price;
//		currentBar.low = price;
//		currentBar.close = price;
//	} else {
//		currentBar.close = price;
//		currentBar.high = Math.max(currentBar.high, price);
//		currentBar.low = Math.min(currentBar.low, price);
//	}
//	candleSeries.update(currentBar);
//}
//
//
//function nextBusinessDay(time) {
//	var d = new Date();
//	d.setUTCFullYear(time.year);
//	d.setUTCMonth(time.month - 1);
//	d.setUTCDate(time.day + 1);
//	d.setUTCHours(0, 0, 0, 0);
//	return {
//		year: d.getUTCFullYear(),
//		month: d.getUTCMonth() + 1,
//		day: d.getUTCDate(),
//	};
//}
//
//setInterval(function() {
//    current_time = currentBar.time
//    // move to next bar
//    currentIndex++;
//    currentBar = {
//        open: null,
//        high: null,
//        low: null,
//        close: null,
//        time: current_time,
//    };
//
//
//}, 200);
