package main

import (
	. "fmt"
	. "math"
)

func IsPrime(n int) bool {
	for i := 2; i <= int(Sqrt(float64(n))); i++ {
		if n%i == 0 {
			return false
		}
	}
	return true
}
func main() {
	var (
		N, Counter  int
		List, Prime []int
	)
	Scanf("%d", &N)
	for i := 3; i <= N; i += 2 {
		List = append(List, i)
	}
	for _, v := range List {
		if IsPrime(v) {
			Prime = append(Prime, v)
		}
	}
	for i := 1; i < len(Prime); i++ {
		if Prime[i] == Prime[i-1]+2 {
			Counter++
		}
	}
	Println(Counter)
}
