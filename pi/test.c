
#include <wiringPiI2C.h>
#include<stdio.h>
#include<stdlib.h>
#include <wiringPi.h>
 
#include <time.h>

int main()
{
    unsigned int start,stop;
    int i;
    start = millis();
    printf("%6.3f",start);
    delay(5000);
    stop = millis();
    printf("%6.3f",stop);
    /*for(i=0; i<2000;i++)
    {
        printf("%d", (i*1)+(1^4));
    }
    printf("\n\n");
    stop = clock();

    //(double)(stop - start) / CLOCKS_PER_SEC

    printf("%6.3f", start);
    printf("\n\n%6.3f", stop);
    return 0;*/
}

