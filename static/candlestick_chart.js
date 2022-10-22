
var chart = LightweightCharts.createChart(document.getElementById('chart'), {
	width: window.s_width * .49,
	height: window.s_height * .7,
	layout: {
		backgroundColor: '#000000',
		textColor: 'rgba(255, 255, 255, 0.9)',
	},
	grid: {
		vertLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
		horzLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
	},
	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
	rightPriceScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
	},
	timeScale: {
	    timeVisible: true,
		borderColor: 'rgba(197, 203, 206, 0.8)',
	},
});

//var candleSeries = chart.addCandlestickSeries({
//	upColor: 'rgba(255, 144, 0, 1)',
//	downColor: '#000',
//	borderDownColor: 'rgba(255, 144, 0, 1)',
//	borderUpColor: 'rgba(255, 144, 0, 1)',
//	wickDownColor: 'rgba(255, 144, 0, 1)',
//	wickUpColor: 'rgba(255, 144, 0, 1)',
//});

var candleSeries = chart.addCandlestickSeries();

fetch('http://localhost:5000/history')
	.then(response => response.json())
	.then(data => {
	    candleSeries.setData(data);
	    });

fetch('http://localhost:5000/trades')
	.then(response => response.json())
	.then(data => {
	    series.setMarkers(data);
	    });

var bSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m')
var dataSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
var myTradeSocket = new WebSocket('wss://stream.binance.com:9443/ws/userDataStream')


bSocket.onmessage = function (event) {
    var message = JSON.parse(event.data);
    var current_candle = message.k;
    updated_candle = candleSeries.update({
        time: current_candle.t/1000,
        open: current_candle.o,
        high: current_candle.h,
        low: current_candle.l,
        close: current_candle.c});
};

myTradeSocket.onmessage = function (event) {
    console.log(event.data)
    var message = JSON.parse(event.data);
    var trade_time = message.T/1000;
    var trade_price = parseFloat(message.p);
    if (parseFloat(message.q) > 0) {
        series.setMarkers({time: trade_time, position: 'belowBar', color: '#2196F3', shape: 'arrowUp', text: 'Buy @ ' + Math.round(trade_price)})
        } else {
        series.setMarkers({time: trade_time, position: 'aboveBar', color: '#e91e63', shape: 'arrowDown', text: 'Sell @ ' + Math.round(trade_price)})
        };

}