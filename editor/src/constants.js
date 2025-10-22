export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
  c: "10.2.0",
  cpp: "10.2.0",
  php: "8.2.3",
};

export const CODE_SNIPPETS = {
  javascript: `function greet(name) {
  console.log("Hello, " + name + "!");
}
greet("JavaScript");`,

  python: `def greet(name):
    print(f"Hello, {name}!")

greet("Python")`,

  java: `class Main {
  public static void main(String[] args) {
    System.out.println("Hello, Java!");
  }
}`,

  c: `#include <stdio.h>
int main() {
  printf("Hello, C!\\n");
  return 0;
}`,

  cpp: `#include <iostream>
using namespace std;
int main() {
  cout << "Hello, C++!" << endl;
  return 0;
}`,

  php: `<?php
echo "Hello, PHP!";
?>`,
};
