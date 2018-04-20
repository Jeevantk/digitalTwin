void setup() {
  Serial.begin(9600);
}

int i=0;
void loop() {
  Serial.print(i++);
  delay(1000); // poll every 100ms
}
