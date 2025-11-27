#include <stdio.h>

#define size 10

typedef struct{
    int arr[size];
    int top;
}stack;

void start(stack *p){
    p->top = 0;
}

int is_empty(stack *p){
    return p->top == 0 ? 1 : 0;
}

int is_full(stack *p){
    return p->top == size ? 1 : 0;
}

void push(stack *p, int value){
    if(is_full(p)){
        printf("Stack is already full!");
    }
    else{
        p->arr[p->top] = value;
        p->top++;
    }
}

void pop(stack *p){
    if(is_empty(p) == 1){
        printf("Stack is empty!");
    }else{
        p->top--;
    }
}

/**
    Program that reads a 10 value stack and prints each value for its position in the stack
*/
int main(int argc, char *argv[]){

    stack p;
    start(&p);
    int value;
    for (int i = 0; i < size; i++) {

        printf("Enter a number to the stack: ");
        scanf("%d", &value);
        printf("\r", &value);
        push(&p, value);
    }
    
    printf("Stack is empty: %s\n", is_empty(&p) == 1 ? "True" : "False");
    printf("Stack is full: %s\n", is_full(&p) == 1 ? "True" : "False");
    
    
    for (int i = size; i >= 0; i--) {

        printf("Value %d is at position %d\n", p.arr[i], i);
    }
}