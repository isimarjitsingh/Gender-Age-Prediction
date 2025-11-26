from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)

# Load models once at server start
faceProto = "opencv_face_detector.pbtxt"
faceModel = "opencv_face_detector_uint8.pb"
ageProto = "age_deploy.prototxt"
ageModel = "age_net.caffemodel"
genderProto = "gender_deploy.prototxt"
genderModel = "gender_net.caffemodel"

faceNet = cv2.dnn.readNet(faceModel, faceProto)
ageNet = cv2.dnn.readNet(ageModel, ageProto)
genderNet = cv2.dnn.readNet(genderModel, genderProto)

MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
ageList = ['0-2', '4-6', '8-12', '15-20', '25-32', '38-43', '48-53', '60+']
genderList = ['Male', 'Female']


def faceBox(faceNet, frame):
    frameHeight = frame.shape[0]
    frameWidth = frame.shape[1]
    blob = cv2.dnn.blobFromImage(frame, 1.0, (227, 227), [104, 117, 123], swapRB=False)
    faceNet.setInput(blob)
    detections = faceNet.forward()
    bboxes = []

    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.7:
            x1 = int(detections[0, 0, i, 3] * frameWidth)
            y1 = int(detections[0, 0, i, 4] * frameHeight)
            x2 = int(detections[0, 0, i, 5] * frameWidth)
            y2 = int(detections[0, 0, i, 6] * frameHeight)
            bboxes.append([x1, y1, x2, y2])

    return bboxes


def detect_gender_age(frame):
    padding = 20
    bboxes = faceBox(faceNet, frame)

    if not bboxes:
        return "Unknown", "Unknown"

    x1, y1, x2, y2 = bboxes[0]  # Use first detected face
    face = frame[max(0, y1 - padding):min(y2 + padding, frame.shape[0] - 1),
                 max(0, x1 - padding):min(x2 + padding, frame.shape[1] - 1)]

    blob = cv2.dnn.blobFromImage(face, 1.0, (227, 227), MODEL_MEAN_VALUES, swapRB=False)

    genderNet.setInput(blob)
    gender = genderList[genderNet.forward()[0].argmax()]

    ageNet.setInput(blob)
    age = ageList[ageNet.forward()[0].argmax()]

    return gender, age


@app.route('/api/predict', methods=['POST'])
def predict():
    file = request.files['image']
    npimg = np.frombuffer(file.read(), np.uint8)
    frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    gender, age = detect_gender_age(frame)

    return jsonify({'gender': gender, 'age': age})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
