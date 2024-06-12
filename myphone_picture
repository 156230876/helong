import os
import shutil
import time

path = "/Users/long.he/Documents/手机视频备份/shouji"
mp4_result = "/Users/long.he/Documents/手机视频备份/mp4_time_sort"
pic_result = "/Users/long.he/Documents/手机视频备份/picture_time_sort"


def check_path():
    if not os.path.exists(mp4_result):
        os.makedirs(mp4_result)

    if not os.path.exists(pic_result):
        os.makedirs(pic_result)


def get_file(path_dir):
    file_list = os.listdir(path_dir)
    dict_list = []
    mp4_list = []
    jpeg_list = []
    for file_name in file_list:
        if file_name.endswith(".MP4") or file_name.endswith(".mp4"):
            mp4_list.append(file_name)
        elif file_name.endswith(".jpg") or file_name.endswith(".jpeg"):
            jpeg_list.append(file_name)
        else:
            if file_name.startswith('.') or '.' in file_name:
                continue
            dict_list.append(file_name)
    # 处理mp4
    deal_with_mp4(mp4_list=mp4_list, path_dir=path_dir)
    # 处理picture
    deal_with_picture(jpeg_list=jpeg_list, path_dir=path_dir)

    # 递归文件夹
    for tmp_path in dict_list:
        get_file(path_dir + "/" + tmp_path)


def deal_with_mp4(mp4_list, path_dir):
    for mp4_name in mp4_list:
        if mp4_name.startswith("wx_camera"):
            time_ = mp4_name.split(".")[0].split("_")[2]
            v = time.localtime(eval(time_) / 1000)
            year = str(v.tm_year)
            month = str(v.tm_mon)
            day = str(v.tm_mday)
            # year, month, day = time.localtime(eval(time_))
        elif mp4_name.startswith("TG"):
            time_ = mp4_name.split("-")
            year = time_[1]
            month = time_[2]
            day = time_[3]
        elif mp4_name.startswith("lv"):
            time_ = mp4_name.split(".")[0].split("_")[2]
            year = time_[0:4]
            month = time_[4:6]
            day = time_[6:8]
        elif mp4_name.startswith("VID"):
            time_ = mp4_name.split(".")[0].split("_")[1]
            year = time_[0:4]
            month = time_[4:6]
            day = time_[6:8]
        elif mp4_name.startswith("mmexport"):
            time_ = mp4_name.split('.')[0].split("mmexport")[1]
            v = time.localtime(eval(time_) / 1000)
            year = str(v.tm_year)
            month = str(v.tm_mon)
            day = str(v.tm_mday)
        else:
            dcim_mp4_name_list = mp4_name.split("_")
            # 处理dicm下面的视频格式
            if len(dcim_mp4_name_list) == 4:
                year = dcim_mp4_name_list[0]
                month = dcim_mp4_name_list[1][0:2]
                day = dcim_mp4_name_list[1][2:]
            else:
                year = 'other'
                month = 'other'
                day = 'other'
        write_file(in_path=path_dir, out_path=mp4_result, year=year, month=month, day=day, file_name=mp4_name)


def deal_with_picture(jpeg_list, path_dir):
    for pic_name in jpeg_list:
        if pic_name.startswith("SAVE_"):
            times_list = pic_name.split("_")
            year = times_list[1][0:4]
            month = times_list[1][4:6]
            day = times_list[1][6:8]
        elif pic_name.startswith("wx_camera"):
            time_ = pic_name.split(".")[0].split("_")[2]
            v = time.localtime(eval(time_) / 1000)
            year = str(v.tm_year)
            month = str(v.tm_mon)
            day = str(v.tm_mday)
        elif pic_name.startswith("mmexport"):
            time_ = pic_name.split('.')[0].split("mmexport")[1]
            v = time.localtime(eval(time_) / 1000)
            year = str(v.tm_year)
            month = str(v.tm_mon)
            day = str(v.tm_mday)
        elif pic_name.startswith("ECommerce"):
            time_ = pic_name.split('.')[0].split("ECommerce")[1]
            v = time.localtime(eval(time_) / 1000)
            year = str(v.tm_year)
            month = str(v.tm_mon)
            day = str(v.tm_mday)
        elif pic_name.startswith("IMG"):
            time_ = pic_name.split("_")[1]
            year = time_[0:4]
            month = time_[4:6]
            day = time_[6:8]
        elif pic_name.startswith("Screenshot"):
            time_ = pic_name.split("_")[1].split('-')
            year = time_[0]
            month = time_[1]
            day = time_[2]
        else:
            times_list = pic_name.split(".")
            # 处理时间戳类型
            if len(times_list) == 2:
                time_ = eval(times_list[0])
                if isinstance(time_, int):
                    v = time.localtime(time_ / 1000)
                    year = str(v.tm_year)
                    month = str(v.tm_mon)
                    day = str(v.tm_mday)
                else:
                    year = 'other'
                    month = 'other'
                    day = 'other'
            else:
                year = 'other'
                month = 'other'
                day = 'other'

        write_file(in_path=path_dir, out_path=pic_result, year=year, month=month, day=day, file_name=pic_name)


def write_file(in_path, out_path, year, month, day, file_name):
    if len(month) == 1:
        month = '0' + month
    if len(day) == 1:
        day = '0' + day

    if not os.path.exists(os.path.join(out_path, year)):
        os.makedirs(os.path.join(out_path, year))
    if not os.path.exists(os.path.join(out_path, year, month)):
        os.makedirs(os.path.join(out_path, year, month))
    if not os.path.exists(os.path.join(out_path, year, month, day)):
        os.makedirs(os.path.join(out_path, year, month, day,))
    old_path = os.path.join(in_path, file_name)
    new_path = os.path.join(out_path, year, month, day, file_name)
    # 如果文件存在先删除，在移动
    if os.path.exists(new_path):
        os.remove(new_path)
    shutil.move(old_path, new_path)


if __name__ == '__main__':
    check_path()
    get_file(path)
