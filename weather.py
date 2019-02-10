from tensorflow.keras.layers import LSTM
from tensorflow.keras.layers import Dense
from tensorflow.keras.models import Sequential
# from sklearn.metrics import mean_squared_error
# from sklearn.preprocessing import LabelEncoder
# from sklearn.preprocessing import MinMaxScaler
from pandas import concat
from pandas import DataFrame
from numpy import concatenate
from math import sqrt
from matplotlib import pyplot
from pandas import read_csv
import tensorflow.keras as keras
import tensorflow as tf
print(tf.__version__)

# import data

dataset = read_csv('weather.csv')
dataset
values = dataset.values

pyplot.figure()
pyplot.plot(values[:, 1])
pyplot.title(dataset.columns[1])

pyplot.show()


def series_to_supervised(data, n_in=1, n_out=1):
    n_vars = 1 if type(data) is list else data.shape[1]
    df = DataFrame(data)
    cols, names = list(), list()
    for i in range(n_in, 0, -1):
        cols.append(df.shift(i))
        names += [('var%d(t)' % (j+1)) for j in range(n_vars)]
    for i in range(0, n_out):
        cols.append(df.shift(-i))
        if i == 0:
            names += [('var%d(t)' % (j+1)) for j in range(n_vars)]
        else:
            names += [('var%d(t+%d)' % (j + 1, i)) for j in range(n_vars)]
    agg = concat(cols, axis=1)
    agg.columns = names
    agg.dropna(inplace=True)
    return agg


print(series_to_supervised([x for x in range(10)], 3))
