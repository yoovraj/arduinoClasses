void setup() {
  // put your setup code here, to run once:
pinMode(8,OUTPUT);
}

void loop() {
  int TIME_DELAY = 3;
  // put your main code here, to run repeatedly:

   for (int i =0; i < 50; i=i+1) {
    digitalWrite(8,HIGH);
    delay(TIME_DELAY);
    digitalWrite(8,LOW);
    delay(TIME_DELAY);
   }
   TIME_DELAY = 2;
   for (int i =0; i < 100; i=i+1) {
    digitalWrite(8,HIGH);
    delay(TIME_DELAY);
    digitalWrite(8,LOW);
    delay(TIME_DELAY);
   }


   
   TIME_DELAY = 1;
   for (int i =0; i < 200; i=i+1) {
    digitalWrite(8,HIGH);
    delay(TIME_DELAY);
    digitalWrite(8,LOW);
    delay(TIME_DELAY);
   }
}

