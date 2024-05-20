package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type FitnessActivity struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Length int    `json:"length"`
}

var activities = make([]FitnessActivity, 0)

func getActivities(c *gin.Context) {
	c.JSON(http.StatusOK, activities)
}

func getActivity(c *gin.Context) {
	id := c.Param("id")
	for _, a := range activities {
		if a.ID == id {
			c.JSON(http.StatusOK, a)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "activity not found"})
}

func createActivity(c *gin.Context) {
	var newActivity FitnessActivity
	if err := c.ShouldBindJSON(&newActivity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	activities = append(activities, newActivity)
	c.JSON(http.StatusCreated, newActivity)
}

func updateActivity(c *gin.Context) {
	id := c.Param("id")
	var updatedActivity FitnessActivity
	if err := c.ShouldBindJSON(&updatedActivity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	for i, a := range activities {
		if a.ID == id {
			activities[i] = updatedActivity
			c.JSON(http.StatusOK, updatedActivity)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "activity not found"})
}

func deleteActivity(c *gin.Context) {
	id := c.Param("id")
	for i, a := range activities {
		if a.ID == id {
			activities = append(activities[:i], activities[i+1:]...)
			c.JSON(http.StatusOK, gin.H{"message": "activity deleted"})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "activity not found"})
}

func main() {
	if err := godotenv.Load(); err != nil {
		panic("No .env file found")
	}

	port, exists := os.LookupEnv("PORT")
	if !exists {
		port = "8080"
	}

	router := gin.Default()

	router.GET("/activities", getActivities)
	router.GET("/activities/:id", getActivity)
	router.POST("/activities", createActivity)
	router.PUT("/activities/:id", updateActivity)
	router.DELETE("/activities/:id", deleteActivity)

	router.Run(":" + port)
}