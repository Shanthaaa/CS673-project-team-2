This guidance document is available in English and Chinese versions/该指导文件有英文版和中文版两版

After downloading the entire "Rubik's_Cube_recovery", use cmd to open the location of this file, and then test according to the following steps

1.Environment preparation
If you haven't set up a Python virtual environment yet, it is recommended that you create one to isolate your project's dependencies. It can be created using the following command:
python -m venv myenv
where myenv is the name of the virtual environment, you can change it as needed.
Then activate the virtual environment:
.\myenv\Scripts\activate

2. Install dependent libraries
Enter the following command to install the dependent libraries:
pip install -r requirements.txt

3. Start the application
Run the app using the following command:
python main.py
If all goes well, you will get output similar to the following:
* Serving Flask app 'api'
  * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
  * Running on all addresses (0.0.0.0)
  * Running on http://127.0.0.1:5000
  * Running on http://10.192.8.36:5000
Press CTRL+C to quit
  * Restarting with stat
  * Debugger is active!
  * Debugger PIN: 128-323-051

4. Test the application
Open a new cmd window and use the following command to perform input testing (the following commands are based on the sample output above):

I. Rubik's Cube Restoration Test:
curl -X POST -H "Content-Type: application/json" -d "{\"cube_state\": \"DRLUUBFBRBLURRLRUBLRDDFDLFUFUFFDBRDUBRUFLLFDDBFLUBLRBD\"}" http://127.0.0.1:5000/v1/solve
Among them, DRLUUBFBRBLURRLRUBLRDDFDLFUFUFFDBRDUBRUFLLFDDBFLUBLRBD can be replaced by any available code that represents the pre-recovery form of the Rubik's Cube. If successful, you will get output similar to the following:
{
   "solution": "D2 R' D' F2 B D R2 D2 R' F2 D' F2 U' B2 L2 U2 D R2 U"
}

II. Reading test of saved Rubik’s cube data:
curl -X GET http://127.0.0.1:5000/v1/get_cube_status
If successful, you will get output similar to the following:
{
   "cube_status": "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLBBBBBBBBB"
}
UUUUUUUUURRRRRRRRRFFFFFFFDDDDDDDLLLLLLLBBBBBBBBB represents the status data of the saved Rubik's Cube. It will appear different depending on the saved Rubik's Cube. The default is "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDLLLLLLLBBBBBBBBB"

III. Test of updating Rubik’s Cube data:
curl -X POST -H "Content-Type: application/json" -d "{\"cube_status\": \"DRLUUBFBRBLURRLRUBLRDDFDLFUFUFFDBRDUBRUFLLFDDBFLUBLRBD\"}" http://127.0.0.1:5000/v1/set_cube_status
Among them, DRLUUBFBRBLURRLRUBLRDDFDLFUFUFFDBRDUBRUFLLFDDBFLUBLRBD can be replaced by any available code representing the shape of the Rubik's Cube. If successful, you will get output similar to the following:
{
   "message": "Cube status updated successfully"
}

IV. Test to reset Rubik’s Cube data:
curl -X POST http://127.0.0.1:5000/v1/reset_cube_status
If successful, you will get output similar to the following:
"message": "Cube status reset successfully"

V. Steps to obtain randomly scrambled Rubik's Cube:
curl http://127.0.0.1:5000/v1/generate_random_cube
If successful, you will get output similar to the following:
{
   "cube_status": "U' D B R2 F2 L2 R B2 R D2 R' D R2 F' R' D F' L F' L2 D2 F2 R F2 L'"
}
25 different scrambling steps will be randomly generated each time, which can be used to scramble the Rubik's Cube.

VI. Randomly obtain a random Rubik's Cube from the saved Rubik's Cube practice set:
curl http://127.0.0.1:5000/v1/get_exercise_cube
If successful, you will get output similar to the following:
{
   "cube_state": "DBLRURBBFLUDURRLFULUFFBDDBRLURDFRRDBBLULDUDBFDLFBLRFF"
}
Each time, any Rubik's Cube string will be selected from 10,000 saved random Rubik's Cubes and output, which can be used to practice solving the Rubik's Cube.

5. End the test
When you want to stop the application, just press Ctrl+C in the command line window running main.py.

For an explanation of the meaning of input format and output format, please refer to https://github.com/muodov/kociemba. The above README.md will have a detailed explanation.

将整个“Rubik's_Cube_recovery”下载后，使用cmd打开这个文件的所在位置，然后根据以下步骤测试

1.环境准备
如果你还没有设置一个Python的虚拟环境（virtual environment），建议你创建一个，以便隔离项目的依赖关系。可以使用以下命令创建：
python -m venv myenv
其中myenv是虚拟环境的名称，你可以根据需要更改。
然后激活虚拟环境：
.\myenv\Scripts\activate

2.安装依赖库
输入如下指令安装依赖库：
pip install -r requirements.txt

3.启动应用
使用以下命令运行应用：
python main.py
如果没问题的话，你会得到类似如下的输出：
* Serving Flask app 'api'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://10.192.8.36:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 128-323-051

4.测试应用
新开一个cmd窗口，使用如下命令进行输入测试（以下的命令基于如上的示例输出进行）：

I.魔方复原测试：
curl -X POST -H "Content-Type: application/json" -d "{\"cube_state\": \"DRLUUBFBRBLURRLRUBLRDDFDLFUFUFFDBRDUBRUFLLFDDBFLUBLRBD\"}" http://127.0.0.1:5000/v1/solve
其中DRLUUBFBRBLURRLRUBLRDDFDLFUFUFFDBRDUBRUFLLFDDBFLUBLRBD可以换为任意可用的表示魔方复原前形态的代码。如果成功的话，会得到类似如下的输出：
{
  "solution": "D2 R' D' F2 B D R2 D2 R' F2 D' F2 U' B2 L2 U2 D R2 U"
}

II.已保存魔方数据的读取测试：
curl -X GET http://127.0.0.1:5000/v1/get_cube_status
如果成功的话，会得到类似如下的输出：
{
  "cube_status": "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB"
}
UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB表示已保存的魔方的状态数据，根据保存的魔方不同会出现不同，默认为“UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB”

III.更新魔方数据的测试：
curl -X POST -H "Content-Type: application/json" -d "{\"cube_status\": \"DRLUUBFBRBLURRLRUBLRDDFDLFUFUFFDBRDUBRUFLLFDDBFLUBLRBD\"}" http://127.0.0.1:5000/v1/set_cube_status
其中DRLUUBFBRBLURRLRUBLRDDFDLFUFUFFDBRDUBRUFLLFDDBFLUBLRBD可以换为任意可用的表示魔方形态的代码。如果成功的话，会得到类似如下的输出：
{
  "message": "Cube status updated successfully"
}

IV.重置魔方数据的测试：
curl -X POST http://127.0.0.1:5000/v1/reset_cube_status
如果成功的话，会得到类似如下的输出：
"message": "Cube status reset successfully"

V.获取随机打乱的魔方步骤：
curl http://127.0.0.1:5000/v1/generate_random_cube
如果成功的话，会得到类似如下的输出：
{
  "cube_status": "U' D B R2 F2 L2 R B2 R D2 R' D R2 F' R' D F' L F' L2 D2 F2 R F2 L'"
}
每次都会随机生成25个不同的打乱步骤，可用于打乱魔方。

VI.随机获取已保存的魔方练习集的随机魔方：
curl http://127.0.0.1:5000/v1/get_exercise_cube
如果成功的话，会得到类似如下的输出：
{
  "cube_state": "DBLRURBBFLUDURURLFULUFFBDDBRLURDFRRDBBLULDUDBFDLFBLRFF"
}
每次都会从10000个已保存的随机魔方中挑选任意一个魔方字符串输出，可用于练习复原魔方。

5.结束测试
当你想要停止应用时，只需在运行main.py的命令行窗口中按Ctrl+C。

有关于输入格式与输出格式的意义的解释，请参阅https://github.com/muodov/kociemba，上面的README.md会有详细的讲解。
