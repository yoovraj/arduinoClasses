import serial
import time



def get_distance():
   ser = serial.Serial(port='/dev/ttyUSB0',baudrate=9600)

   ser.write(b'r')
   val = ""
   time.sleep(0.05)
   while ser.inWaiting():
      val = int(ser.readline())
   val = 0   if val < 0   else val
   val = 100 if val > 100 else val
   val = val / 100.0
   return val



