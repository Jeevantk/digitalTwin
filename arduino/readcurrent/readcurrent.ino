 /*
  ReadAnalogVoltage
  Reads an analog input on pin 0, converts it to voltage, and prints the result to the serial monitor.
  Graphical representation is available using serial plotter (Tools > Serial Plotter menu)
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.

  This example code is in the public domain.
*/
int motpin=13;
bool running = false;

String inputString = ""; 

void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  pinMode(motpin, OUTPUT);
  digitalWrite(motpin, LOW);
}

bool condition = false;
// the loop routine runs over and over again forever:
void loop() {

  while(Serial.available())
  {
    switch (Serial.read())
    {
      case '3':
        digitalWrite(motpin, LOW);
        break;
      case '0':
        digitalWrite(motpin, HIGH);
        break;
      case '1':
        running = true;
        Serial.print('\n');
        break;
      case '2':
        running = false;
        break;
    }
  }

  if (running)
  {
    int sensorValue = analogRead(A0);
    Serial.println(sensorValue);
  }
}
