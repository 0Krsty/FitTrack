package main

import (
    "net/http"
    "os"

    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
)

type FitnessActivity struct {
    ID       string `json:"id"`
    Name     string `json:"name"`
    Duration int    `json:"duration"`
}

var fitnessActivitiesList = make([]FitnessActivity, 0)

func findActivityIndexByID(id string) (int, error) {
    for i, activity := range fitnessActivitiesList {
        if activity.ID == id {
            return i, nil
        }
    }
    return -1, gin.Error{Err: nil, Type: gin.ErrorTypePublic, Meta: "Activity not found"}
}

func fetchAllActivities(c *gin.Context) {
    c.JSON(http.StatusOK, fitnessActivitiesList)
}

func fetchSingleActivity(c *gin.Context) {
    id := c.Param("id")
    index, err := findActivityIndexByID(id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
        return
    }
    c.JSON(http.StatusOK, fitnessActivitiesList[index])
}

func createNewActivity(c *gin.Context) {
    var newFitnessActivity FitnessActivity
    if err := c.ShouldBindJSON(&newFitnessActivity); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    fitnessActivitiesList = append(fitnessActivitiesList, newFitnessActivity)
    c.JSON(http.StatusCreated, newFitnessActivity)
}

func modifyActivity(c *gin.Context) {
    id := c.Param("id")
    var updatedFitnessActivity FitnessActivity
    if err := c.ShouldBindJSON(&updatedFitnessActivity); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    index, err := findActivityIndexByID(id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
        return
    }
    fitnessActivitiesList[index] = updatedFitnessActivity
    c.JSON(http.StatusOK, updatedFitnessActivity)
}

func removeActivity(c *gin.Context) {
    id := c.Param("id")
    index, err := findActivityIndexByID(id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
        return
    }
    fitnessActivitiesList = append(fitnessActivitiesList[:index], fitnessActivitiesList[index+1:]...)
    c.JSON(http.StatusOK, gin.H{"message": "Activity deleted"})
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

    router.GET("/activities", fetchAllActivities)
    router.GET("/activities/:id", fetchSingleActivity)
    router.POST("/activities", createNewActivity)
    router.PUT("/activities/:id", modifyActivity)
    router.DELETE("/activities/:id", removeActivity)

    router.Run(":" + port)
}