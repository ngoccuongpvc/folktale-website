package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func handlePing(c *gin.Context) {
	c.String(http.StatusOK, "Pong")
}
func main() {
	println("Hello World!")
	router := gin.Default()

	router.GET("ping", handlePing)

	router.Run()
}
