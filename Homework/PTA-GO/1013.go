package main

import (
	. "fmt"
	. "math"
)

func isPrime(n int) bool {
	for i := 2; i <= int(Sqrt(float64(n))); i++ {
		if n%i == 0 {
			return false
		}
	}
	return n > 1
}
func main() {
	var (
		m, n, c int
	)
	Scanf("%d%d", &m, &n)
	for i, j := 2, 1; ; i++ {
		if isPrime(i) {
			c++
			if c >= m && c <= n {
				if c == n {
					Printf("%d", i)
					break
				}
				if j%10 == 0 {
					Printf("%d\n", i)
					j++
				} else {
					Printf("%d ", i)
					j++
				}
			}
		}
	}
}
