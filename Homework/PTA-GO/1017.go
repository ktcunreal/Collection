package main

import (
	. "fmt"
	"math/big"
)

func main() {
	A, B := "", 0
	Scanf("%s%d", &A, &B)
	BigA, _ := new(big.Int).SetString(A, 10)
	BigB := new(big.Int).SetInt64(int64(B))
	Q, R := new(big.Int), new(big.Int)
	Q.DivMod(BigA, BigB, R)
	Printf("%v %v", Q, R)
}
