from flask import Flask, render_template, jsonify, url_for
from flask_cors import CORS
from binance.client import Client
from binance.streams import BinanceSocketManager
from binance import ThreadedWebsocketManager
from binance.enums import *
import config
import datetime as dt
import pytz
import sys


client = Client(config.API_KEY, config.API_SECRET, tld = 'us')
# myTradeSocket = BinanceSocketManager(client)
myTradeSocket = ThreadedWebsocketManager(client)
global klines
klines = []
app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/klines')
def store_kline_data(msg):
    with app.app_context():

        candle = msg['k']
        if candle['x'] == True:
            klines.append(
                {'time': candle['t'] / 1000,
                 'open': candle['o'],
                 'high': candle['h'],
                 'low': candle['l'],
                 'close': candle['c']})

            if len(klines) > 100:
                del klines[0]


        return klines



@app.route('/history')
def initialize_chart():
    start = (dt.datetime.today() - dt.timedelta(days = 3)).astimezone(pytz.utc).strftime('%Y/%m/%d %H:%M:%S')
    candlesticks = client.get_historical_klines('BTCUSDT', '1m', start_str = start, end_str = dt.datetime.today().astimezone(pytz.utc).strftime('%Y/%m/%d %H:%M:%S'))


    formatted_candlesticks = [{'time': candle[0]/1000,
                               'open': candle[1],
                               'high': candle[2],
                               'low': candle[3],
                               'close': candle[4]} for candle in candlesticks]

    # return jsonify(klines)
    return jsonify(formatted_candlesticks)


@app.route('/trades')
def get_past_trades():
    trades = client.get_my_trades(symbol = 'BTCUSDT')
    for trade in trades:
        trade['T'] /= 1000
    return jsonify(trades)



if __name__ == '__main__':
    klineSocket = myTradeSocket.start_kline_socket(symbol = 'BTCUSDT', callback = store_kline_data, interval='1m')
    myTradeSocket.start()
    app.run(host = '127.0.0.1', port = 5000, debug = True)
