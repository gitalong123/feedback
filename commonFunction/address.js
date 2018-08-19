function getAreaInfo(callback) {
    var address = [{
        "code": "410000",
        "name": "河南省",
        "childs": [{
                "code": "410100",
                "name": "郑州市",
                "childs": [{
                        "code": "410101",
                        "name": "市辖区"
                    },
                    {
                        "code": "410102",
                        "name": "中原区"
                    }, {
                        "code": "410103",
                        "name": "二七区"
                    }, {
                        "code": "410104",
                        "name": "管城回族区"
                    }, {
                        "code": "410105",
                        "name": "金水区"
                    }, {
                        "code": "410106",
                        "name": "上街区"
                    }, {
                        "code": "410108",
                        "name": "惠济区"
                    }, {
                        "code": "410122",
                        "name": "中牟县"
                    }, {
                        "code": "410181",
                        "name": "巩义市"
                    }, {
                        "code": "410182",
                        "name": "荥阳市"
                    }, {
                        "code": "410183",
                        "name": "新密市"
                    }, {
                        "code": "410184",
                        "name": "新郑市"
                    }, {
                        "code": "410185",
                        "name": "登封市"
                    }
                ]
            },
            {
                "code": "410200",
                "name": "开封市",
                "childs": [{
                        "code": "410201",
                        "name": "市辖区"
                    },
                    {
                        "code": "410202",
                        "name": "龙亭区"
                    }, {
                        "code": "410203",
                        "name": "顺河回族区"
                    },
                    {
                        "code": "410204",
                        "name": "鼓楼区"
                    }, {
                        "code": "410205",
                        "name": "禹王台区"
                    },
                    {
                        "code": "410211",
                        "name": "金明区"
                    }, {
                        "code": "410221",
                        "name": "杞县"
                    },
                    {
                        "code": "410222",
                        "name": "通许县"
                    }, {
                        "code": "410223",
                        "name": "尉氏县"
                    },
                    {
                        "code": "410224",
                        "name": "开封县"
                    }, {
                        "code": "410225",
                        "name": "兰考县"
                    }
                ]
            },
            {
                "code": "410300",
                "name": "洛阳市",
                "childs": [{
                        "code": "410301",
                        "name": "市辖区"
                    },
                    {
                        "code": "410302",
                        "name": "老城区"
                    }, {
                        "code": "410303",
                        "name": "西工区"
                    },
                    {
                        "code": "410304",
                        "name": "瀍河回族区"
                    }, {
                        "code": "410305",
                        "name": "涧西区"
                    },
                    {
                        "code": "410306",
                        "name": "吉利区"
                    }, {
                        "code": "410311",
                        "name": "洛龙区"
                    },
                    {
                        "code": "410322",
                        "name": "孟津县"
                    }, {
                        "code": "410323",
                        "name": "新安县"
                    },
                    {
                        "code": "410324",
                        "name": "栾川县"
                    }, {
                        "code": "410325",
                        "name": "嵩县"
                    },
                    {
                        "code": "410326",
                        "name": "汝阳县"
                    }, {
                        "code": "410327",
                        "name": "宜阳县"
                    },
                    {
                        "code": "410328",
                        "name": "洛宁县"
                    }, {
                        "code": "410329",
                        "name": "伊川县"
                    },
                    {
                        "code": "410381",
                        "name": "偃师市"
                    }
                ]
            },
            {
                "code": "410400",
                "name": "平顶山市",
                "childs": [{
                        "code": "410401",
                        "name": "市辖区"
                    },
                    {
                        "code": "410402",
                        "name": "新华区"
                    }, {
                        "code": "410403",
                        "name": "卫东区",
                    },
                    {
                        "code": "410404",
                        "name": "石龙区"
                    }, {
                        "code": "410411",
                        "name": "湛河区"
                    },
                    {
                        "code": "410421",
                        "name": "宝丰县",
                    }, {
                        "code": "410422",
                        "name": "叶县",
                    },
                    {
                        "code": "410423",
                        "name": "鲁山县"
                    }, {
                        "code": "410425",
                        "name": "郏县",
                    },
                    {
                        "code": "410481",
                        "name": "舞钢市",
                    }, {
                        "code": "410482",
                        "name": "汝州市"
                    }
                ]
            },
            {
                "code": "410500",
                "name": "安阳市",
                "childs": [{
                        "code": "410501",
                        "name": "市辖区",
                    },
                    {
                        "code": "410502",
                        "name": "文峰区"
                    }, {
                        "code": "410503",
                        "name": "北关区"
                    },
                    {
                        "code": "410505",
                        "name": "殷都区",
                    }, {
                        "code": "410506",
                        "name": "龙安区",
                    },
                    {
                        "code": "410522",
                        "name": "安阳县",
                    }, {
                        "code": "410523",
                        "sheng": "41",
                        "di": "05",
                        "xian": "23",
                        "name": "汤阴县",
                        "level": 3
                    },
                    {
                        "code": "410526",
                        "sheng": "41",
                        "di": "05",
                        "xian": "26",
                        "name": "滑县",
                        "level": 3
                    }, {
                        "code": "410527",
                        "sheng": "41",
                        "di": "05",
                        "xian": "27",
                        "name": "内黄县",
                        "level": 3
                    },
                    {
                        "code": "410581",
                        "sheng": "41",
                        "di": "05",
                        "xian": "81",
                        "name": "林州市",
                        "level": 3
                    }
                ]
            },
            {
                "code": "410600",
                "name": "鹤壁市",
                "childs": [{
                        "code": "410601",
                        "sheng": "41",
                        "di": "06",
                        "xian": "01",
                        "name": "市辖区",
                    },
                    {
                        "code": "410602",
                        "sheng": "41",
                        "di": "06",
                        "xian": "02",
                        "name": "鹤山区",
                    }, {
                        "code": "410603",
                        "sheng": "41",
                        "di": "06",
                        "xian": "03",
                        "name": "山城区",
                    },
                    {
                        "code": "410611",
                        "sheng": "41",
                        "di": "06",
                        "xian": "11",
                        "name": "淇滨区",
                    },
                    {
                        "code": "410621",
                        "sheng": "41",
                        "di": "06",
                        "xian": "21",
                        "name": "浚县",
                    },
                    {
                        "code": "410622",
                        "sheng": "41",
                        "di": "06",
                        "xian": "22",
                        "name": "淇县",
                    }
                ]
            }, {
                "code": "410700",
                "name": "新乡市",
                "childs": [{
                        "code": "410701",
                        "sheng": "41",
                        "di": "07",
                        "xian": "01",
                        "name": "市辖区",
                    },
                    {
                        "code": "410702",
                        "sheng": "41",
                        "di": "07",
                        "xian": "02",
                        "name": "红旗区"
                    }, {
                        "code": "410703",
                        "sheng": "41",
                        "di": "07",
                        "xian": "03",
                        "name": "卫滨区"
                    },
                    {
                        "code": "410704",
                        "sheng": "41",
                        "di": "07",
                        "xian": "04",
                        "name": "凤泉区"
                    },
                    {
                        "code": "410711",
                        "sheng": "41",
                        "di": "07",
                        "xian": "11",
                        "name": "牧野区"
                    },
                    {
                        "code": "410721",
                        "sheng": "41",
                        "di": "07",
                        "xian": "21",
                        "name": "新乡县"
                    },
                    {
                        "code": "410724",
                        "sheng": "41",
                        "di": "07",
                        "xian": "24",
                        "name": "获嘉县"
                    },
                    {
                        "code": "410725",
                        "sheng": "41",
                        "di": "07",
                        "xian": "25",
                        "name": "原阳县"
                    },
                    {
                        "code": "410726",
                        "sheng": "41",
                        "di": "07",
                        "xian": "26",
                        "name": "延津县"
                    },
                    {
                        "code": "410727",
                        "sheng": "41",
                        "di": "07",
                        "xian": "27",
                        "name": "封丘县"
                    },
                    {
                        "code": "410728",
                        "sheng": "41",
                        "di": "07",
                        "xian": "28",
                        "name": "长垣县"
                    },
                    {
                        "code": "410781",
                        "sheng": "41",
                        "di": "07",
                        "xian": "81",
                        "name": "卫辉市"
                    },
                    {
                        "code": "410782",
                        "sheng": "41",
                        "di": "07",
                        "xian": "82",
                        "name": "辉县市"
                    }
                ]
            }, {
                "code": "410800",
                "name": "焦作市",
                "childs": [{
                        "code": "410801",
                        "sheng": "41",
                        "di": "08",
                        "xian": "01",
                        "name": "市辖区",
                    },
                    {
                        "code": "410802",
                        "sheng": "41",
                        "di": "08",
                        "xian": "02",
                        "name": "解放区"
                    }, {
                        "code": "410803",
                        "sheng": "41",
                        "di": "08",
                        "xian": "03",
                        "name": "中站区"
                    },
                    {
                        "code": "410804",
                        "sheng": "41",
                        "di": "08",
                        "xian": "04",
                        "name": "马村区"
                    },
                    {
                        "code": "410811",
                        "sheng": "41",
                        "di": "08",
                        "xian": "11",
                        "name": "山阳区"
                    },
                    {
                        "code": "410821",
                        "sheng": "41",
                        "di": "08",
                        "xian": "21",
                        "name": "修武县"
                    },
                    {
                        "code": "410822",
                        "sheng": "41",
                        "di": "08",
                        "xian": "22",
                        "name": "博爱县"
                    },
                    {
                        "code": "410823",
                        "sheng": "41",
                        "di": "08",
                        "xian": "23",
                        "name": "武陟县"
                    },
                    {
                        "code": "410825",
                        "sheng": "41",
                        "di": "08",
                        "xian": "25",
                        "name": "温县"
                    },
                    {
                        "code": "410882",
                        "sheng": "41",
                        "di": "08",
                        "xian": "82",
                        "name": "沁阳市"
                    },
                    {
                        "code": "410883",
                        "sheng": "41",
                        "di": "08",
                        "xian": "83",
                        "name": "孟州市"
                    }
                ]
            }, {
                "code": "410900",
                "name": "濮阳市",
                "childs": [{
                        "code": "410901",
                        "sheng": "41",
                        "di": "09",
                        "xian": "01",
                        "name": "市辖区",
                    },
                    {
                        "code": "410902",
                        "sheng": "41",
                        "di": "09",
                        "xian": "02",
                        "name": "华龙区",
                    }, {
                        "code": "410922",
                        "sheng": "41",
                        "di": "09",
                        "xian": "22",
                        "name": "清丰县",
                    },
                    {
                        "code": "410923",
                        "sheng": "41",
                        "di": "09",
                        "xian": "23",
                        "name": "南乐县"
                    },
                    {
                        "code": "410926",
                        "sheng": "41",
                        "di": "09",
                        "xian": "26",
                        "name": "范县"
                    },
                    {
                        "code": "410927",
                        "sheng": "41",
                        "di": "09",
                        "xian": "27",
                        "name": "台前县"
                    },
                    {
                        "code": "410928",
                        "sheng": "41",
                        "di": "09",
                        "xian": "28",
                        "name": "濮阳县"
                    }
                ]
            }, {
                "code": "411000",
                "name": "许昌市",
                "childs": [{
                        "code": "411001",
                        "sheng": "41",
                        "di": "10",
                        "xian": "01",
                        "name": "市辖区",
                    },
                    {
                        "code": "411002",
                        "sheng": "41",
                        "di": "10",
                        "xian": "02",
                        "name": "魏都区",
                    }, {
                        "code": "411023",
                        "sheng": "41",
                        "di": "10",
                        "xian": "23",
                        "name": "许昌县",
                    },
                    {
                        "code": "411024",
                        "sheng": "41",
                        "di": "10",
                        "xian": "24",
                        "name": "鄢陵县",
                    },
                    {
                        "code": "411025",
                        "sheng": "41",
                        "di": "10",
                        "xian": "25",
                        "name": "襄城县",
                    },
                    {
                        "code": "411081",
                        "sheng": "41",
                        "di": "10",
                        "xian": "81",
                        "name": "禹州市",
                    },
                    {

                        "code": "411082",
                        "sheng": "41",
                        "di": "10",
                        "xian": "82",
                        "name": "长葛市",
                    }
                ]
            }, {
                "code": "411100",
                "name": "漯河市",
                "childs": [{
                        "code": "411101",
                        "sheng": "41",
                        "di": "11",
                        "xian": "01",
                        "name": "市辖区"
                    },
                    {
                        "code": "411102",
                        "sheng": "41",
                        "di": "11",
                        "xian": "02",
                        "name": "源汇区",
                    }, {
                        "code": "411103",
                        "sheng": "41",
                        "di": "11",
                        "xian": "03",
                        "name": "郾城区",
                    },
                    {
                        "code": "411104",
                        "sheng": "41",
                        "di": "11",
                        "xian": "04",
                        "name": "召陵区"
                    },
                    {
                        "code": "411121",
                        "sheng": "41",
                        "di": "11",
                        "xian": "21",
                        "name": "舞阳县",
                    },
                    {
                        "code": "411122",
                        "sheng": "41",
                        "di": "11",
                        "xian": "22",
                        "name": "临颍县"
                    }
                ]
            }, {
                "code": "411200",
                "name": "三门峡市",
                "childs": [{
                        "code": "411201",
                        "sheng": "41",
                        "di": "12",
                        "xian": "01",
                        "name": "市辖区",
                    },
                    {
                        "code": "411202",
                        "sheng": "41",
                        "di": "12",
                        "xian": "02",
                        "name": "湖滨区",
                    }, {
                        "code": "411221",
                        "sheng": "41",
                        "di": "12",
                        "xian": "21",
                        "name": "渑池县",
                    },
                    {
                        "code": "411222",
                        "sheng": "41",
                        "di": "12",
                        "xian": "22",
                        "name": "陕县",
                    },
                    {
                        "code": "411224",
                        "sheng": "41",
                        "di": "12",
                        "xian": "24",
                        "name": "卢氏县",
                    },
                    {
                        "code": "411281",
                        "sheng": "41",
                        "di": "12",
                        "xian": "81",
                        "name": "义马市",
                    }, {
                        "code": "411282",
                        "sheng": "41",
                        "di": "12",
                        "xian": "82",
                        "name": "灵宝市",
                    },
                ]
            }, {
                "code": "411300",
                "name": "南阳市",
                "childs": [{
                        "code": "411301",
                        "sheng": "41",
                        "di": "13",
                        "xian": "01",
                        "name": "市辖区"
                    },
                    {
                        "code": "411302",
                        "sheng": "41",
                        "di": "13",
                        "xian": "02",
                        "name": "宛城区"
                    }, {
                        "code": "411303",
                        "sheng": "41",
                        "di": "13",
                        "xian": "03",
                        "name": "卧龙区",
                    },
                    {
                        "code": "411321",
                        "sheng": "41",
                        "di": "13",
                        "xian": "21",
                        "name": "南召县",
                    },
                    {
                        "code": "411322",
                        "sheng": "41",
                        "di": "13",
                        "xian": "22",
                        "name": "方城县",
                    },
                    {
                        "code": "411323",
                        "sheng": "41",
                        "di": "13",
                        "xian": "23",
                        "name": "西峡县",
                    }, {
                        "code": "411324",
                        "sheng": "41",
                        "di": "13",
                        "xian": "24",
                        "name": "镇平县",
                        "level": 3
                    },
                    {
                        "code": "411325",
                        "sheng": "41",
                        "di": "13",
                        "xian": "25",
                        "name": "内乡县",
                        "level": 3
                    },
                    {
                        "code": "411326",
                        "sheng": "41",
                        "di": "13",
                        "xian": "26",
                        "name": "淅川县",
                        "level": 3
                    },
                    {
                        "code": "411327",
                        "sheng": "41",
                        "di": "13",
                        "xian": "27",
                        "name": "社旗县",
                        "level": 3
                    },
                    {
                        "code": "411328",
                        "sheng": "41",
                        "di": "13",
                        "xian": "28",
                        "name": "唐河县",
                        "level": 3
                    },
                    {
                        "code": "411329",
                        "sheng": "41",
                        "di": "13",
                        "xian": "29",
                        "name": "新野县",
                        "level": 3
                    },
                    {
                        "code": "411330",
                        "sheng": "41",
                        "di": "13",
                        "xian": "30",
                        "name": "桐柏县",
                        "level": 3
                    },
                    {
                        "code": "411381",
                        "sheng": "41",
                        "di": "13",
                        "xian": "81",
                        "name": "邓州市",
                        "level": 3
                    },
                ]
            }, {
                "code": "411400",
                "name": "商丘市",
                "childs": [{
                        "code": "411401",
                        "sheng": "41",
                        "di": "14",
                        "xian": "01",
                        "name": "市辖区",
                        "level": 3
                    },
                    {
                        "code": "411402",
                        "sheng": "41",
                        "di": "14",
                        "xian": "02",
                        "name": "梁园区",
                        "level": 3
                    },
                    {
                        "code": "411403",
                        "sheng": "41",
                        "di": "14",
                        "xian": "03",
                        "name": "睢阳区",
                        "level": 3
                    },
                    {
                        "code": "411421",
                        "sheng": "41",
                        "di": "14",
                        "xian": "21",
                        "name": "民权县",
                        "level": 3
                    },
                    {
                        "code": "411422",
                        "sheng": "41",
                        "di": "14",
                        "xian": "22",
                        "name": "睢县",
                        "level": 3
                    },
                    {
                        "code": "411423",
                        "sheng": "41",
                        "di": "14",
                        "xian": "23",
                        "name": "宁陵县",
                        "level": 3
                    },
                    {
                        "code": "411424",
                        "sheng": "41",
                        "di": "14",
                        "xian": "24",
                        "name": "柘城县",
                        "level": 3
                    },
                    {
                        "code": "411425",
                        "sheng": "41",
                        "di": "14",
                        "xian": "25",
                        "name": "虞城县",
                        "level": 3
                    },
                    {
                        "code": "411426",
                        "sheng": "41",
                        "di": "14",
                        "xian": "26",
                        "name": "夏邑县",
                        "level": 3
                    },
                    {
                        "code": "411481",
                        "sheng": "41",
                        "di": "14",
                        "xian": "81",
                        "name": "永城市",
                        "level": 3
                    },
                ]
            }, {
                "code": "411500",
                "name": "信阳市",
                "childs": [{
                        "code": "411501",
                        "sheng": "41",
                        "di": "15",
                        "xian": "01",
                        "name": "市辖区",
                        "level": 3
                    },
                    {
                        "code": "411502",
                        "sheng": "41",
                        "di": "15",
                        "xian": "02",
                        "name": "浉河区",
                        "level": 3
                    },
                    {
                        "code": "411503",
                        "sheng": "41",
                        "di": "15",
                        "xian": "03",
                        "name": "平桥区",
                        "level": 3
                    },
                    {
                        "code": "411521",
                        "sheng": "41",
                        "di": "15",
                        "xian": "21",
                        "name": "罗山县",
                        "level": 3
                    },
                    {
                        "code": "411522",
                        "sheng": "41",
                        "di": "15",
                        "xian": "22",
                        "name": "光山县",
                        "level": 3
                    },
                    {
                        "code": "411523",
                        "sheng": "41",
                        "di": "15",
                        "xian": "23",
                        "name": "新县",
                        "level": 3
                    },
                    {
                        "code": "411524",
                        "sheng": "41",
                        "di": "15",
                        "xian": "24",
                        "name": "商城县",
                        "level": 3
                    },
                    {
                        "code": "411525",
                        "sheng": "41",
                        "di": "15",
                        "xian": "25",
                        "name": "固始县",
                        "level": 3
                    },
                    {
                        "code": "411526",
                        "sheng": "41",
                        "di": "15",
                        "xian": "26",
                        "name": "潢川县",
                        "level": 3
                    },
                    {
                        "code": "411527",
                        "sheng": "41",
                        "di": "15",
                        "xian": "27",
                        "name": "淮滨县",
                        "level": 3
                    },
                    {
                        "code": "411528",
                        "sheng": "41",
                        "di": "15",
                        "xian": "28",
                        "name": "息县",
                        "level": 3
                    },
                ]
            }, {
                "code": "411600",
                "name": "周口市",
                "childs": [{
                        "code": "411601",
                        "sheng": "41",
                        "di": "16",
                        "xian": "01",
                        "name": "市辖区",
                        "level": 3
                    },
                    {
                        "code": "411602",
                        "sheng": "41",
                        "di": "16",
                        "xian": "02",
                        "name": "川汇区",
                        "level": 3
                    },
                    {
                        "code": "411621",
                        "sheng": "41",
                        "di": "16",
                        "xian": "21",
                        "name": "扶沟县",
                        "level": 3
                    },
                    {
                        "code": "411622",
                        "sheng": "41",
                        "di": "16",
                        "xian": "22",
                        "name": "西华县",
                        "level": 3
                    },
                    {
                        "code": "411623",
                        "sheng": "41",
                        "di": "16",
                        "xian": "23",
                        "name": "商水县",
                        "level": 3
                    },
                    {
                        "code": "411624",
                        "sheng": "41",
                        "di": "16",
                        "xian": "24",
                        "name": "沈丘县",
                        "level": 3
                    },
                    {
                        "code": "411625",
                        "sheng": "41",
                        "di": "16",
                        "xian": "25",
                        "name": "郸城县",
                        "level": 3
                    },
                    {
                        "code": "411626",
                        "sheng": "41",
                        "di": "16",
                        "xian": "26",
                        "name": "淮阳县",
                        "level": 3
                    },
                    {
                        "code": "411627",
                        "sheng": "41",
                        "di": "16",
                        "xian": "27",
                        "name": "太康县",
                        "level": 3
                    },
                    {
                        "code": "411628",
                        "sheng": "41",
                        "di": "16",
                        "xian": "28",
                        "name": "鹿邑县",
                        "level": 3
                    },
                    {
                        "code": "411681",
                        "sheng": "41",
                        "di": "16",
                        "xian": "81",
                        "name": "项城市",
                        "level": 3
                    },
                ]
            }, {
                "code": "411700",
                "name": "驻马店市",
                "childs": [{
                        "code": "411701",
                        "sheng": "41",
                        "di": "17",
                        "xian": "01",
                        "name": "市辖区",
                        "level": 3
                    },
                    {
                        "code": "411702",
                        "sheng": "41",
                        "di": "17",
                        "xian": "02",
                        "name": "驿城区",
                        "level": 3
                    },
                    {
                        "code": "411721",
                        "sheng": "41",
                        "di": "17",
                        "xian": "21",
                        "name": "西平县",
                        "level": 3
                    },
                    {
                        "code": "411722",
                        "sheng": "41",
                        "di": "17",
                        "xian": "22",
                        "name": "上蔡县",
                        "level": 3
                    },
                    {
                        "code": "411723",
                        "sheng": "41",
                        "di": "17",
                        "xian": "23",
                        "name": "平舆县",
                        "level": 3
                    },
                    {
                        "code": "411724",
                        "sheng": "41",
                        "di": "17",
                        "xian": "24",
                        "name": "正阳县",
                        "level": 3
                    },
                    {
                        "code": "411725",
                        "sheng": "41",
                        "di": "17",
                        "xian": "25",
                        "name": "确山县",
                        "level": 3
                    },
                    {
                        "code": "411726",
                        "sheng": "41",
                        "di": "17",
                        "xian": "26",
                        "name": "泌阳县",
                        "level": 3
                    },
                    {
                        "code": "411727",
                        "sheng": "41",
                        "di": "17",
                        "xian": "27",
                        "name": "汝南县",
                        "level": 3
                    },
                    {
                        "code": "411728",
                        "sheng": "41",
                        "di": "17",
                        "xian": "28",
                        "name": "遂平县",
                        "level": 3
                    },
                    {
                        "code": "411729",
                        "sheng": "41",
                        "di": "17",
                        "xian": "29",
                        "name": "新蔡县",
                        "level": 3
                    },
                ]
            }, {
                "code": "419000",
                "sheng": "41",
                "di": "90",
                "xian": "00",
                "name": "省直辖县级行政区划",
                "childs": [{
                    "code": "419001",
                    "sheng": "41",
                    "di": "90",
                    "xian": "01",
                    "name": "济源市",
                    "level": 3
                }]
            }
        ]
    }]
    if (callback) {
        callback(address)
    } else {
        return address
    }

}
module.exports.getAreaInfo = getAreaInfo;
