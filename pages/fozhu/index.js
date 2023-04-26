var t, e;

t = "", e = "", Page({
    data: {
        beads: [ {}, {}, {}, {}, {}, {}, {}, {}, {} ],
        i: 1,
        current: 0,
        firstIndex: 0,
        lastIndex: 6,
        playing: !0,
        score: 0,
        scoreAnimateData: null,
        score_animated: !1,
        htuserInfo: {},
        audio: !0
    },
    audioContext: null,
    scoreAnimation: null,
    onLoad: function(a) {
        var n = this;
        console.log(a), getApp().videoid && wx.createRewardedVideoAd && ((e = wx.createRewardedVideoAd({
            adUnitId: getApp().videoid
        })).onLoad(function() {}), e.onError(function(t) {}), e.onClose(function(t) {
            t && t.isEnded ? n.overvideo() : wx.showToast({
                title: "完整看完才能解锁哦~",
                icon: "none"
            });
        })), getApp().interid && (wx.createInterstitialAd && ((t = wx.createInterstitialAd({
            adUnitId: getApp().interid
        })).onLoad(function() {}), t.onError(function(t) {}), t.onClose(function() {})), 
        setTimeout(function() {
            t && t.show().catch(function(t) {
                console.error(t);
            });
        }, 2e3)), (o = wx.getStorageSync("i")) ? this.setData({
            beadimg: "../../res/" + o + ".png"
        }) : this.setData({
            beadimg: "../../res/" + this.data.i + ".png"
        }), this.innerAudioContext = wx.createInnerAudioContext({
            useWebAudioImplement: !0
        }), this.innerAudioContext.src = "res/sound.mp3";
        for (var o = 0; o < 10; o++) this["agd" + o] = wx.createAnimation({
            duration: 250,
            transformOrigin: "right top",
            timingFunction: "ease-out"
        });
    },
    onShow: function() {
        if (wx.showShareMenu({
            withShareTicket: !1,
            menus: [ "shareAppMessage", "shareTimeline" ]
        }), wx.getStorageSync("fz" + this.getCurrentDate())) console.log(wx.getStorageSync("fz" + this.getCurrentDate())), 
        this.setData({
            score: wx.getStorageSync("fz" + this.getCurrentDate())
        }); else for (let t = -1; t > -3; t--) wx.removeStorageSync("fz" + this.getCurrentDate(t));
    },
    play: function() {
        this.innerAudioContext.pause ? (this.innerAudioContext.play(), this.setData({
            playing: !0
        })) : (this.innerAudioContext.stop(), this.setData({
            playing: !1
        }));
    },
    openaudio: function() {
        this.setData({
            audio: !this.data.audio
        });
    },
    refreshClick: function(t) {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "是否重置数据？",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), wx.reportEvent("refresh", {
                    yesno: "yes"
                }), e.setData({
                    score: 0
                }), wx.getStorageSync("fz" + e.getCurrentDate()) && wx.removeStorageSync("fz" + e.getCurrentDate())) : t.cancel && (console.log("用户点击取消"), 
                wx.reportEvent("refresh", {
                    yesno: "no"
                }));
            }
        });
    },
    overvideo: function() {
        if (wx.setStorageSync("fz-key", this.getCurrentDate()), this.data.i < 5) {
            var t = this.data.i + 1;
            this.setData({
                i: t,
                beadimg: "../../res/" + t + ".png"
            }), wx.setStorage({
                key: "i",
                data: t
            });
        } else t = 1, this.setData({
            i: t,
            beadimg: "../../res/" + t + ".png"
        }), wx.setStorage({
            key: "i",
            data: t
        });
    },
    geClick() {
        var t = this;
        if (wx.getStorageSync("fz-key") && wx.getStorageSync("fz-key") == this.getCurrentDate()) return this.overvideo(), 
        !1;
        if (e && wx.showModal({
            title: "未解锁",
            content: "看一段视频，可在今日随意切换佛珠皮肤",
            confirmColor: "#439057",
            success: function(a) {
                a.confirm && e && e.show().catch(function() {
                    e.load().then(function() {
                        return e.show();
                    }).catch(function(e) {
                        if (console.log("激励视频 广告显示失败"), t.data.i < 5) {
                            var a = t.data.i + 1;
                            t.setData({
                                i: a,
                                beadimg: "../../res/" + a + ".png"
                            }), wx.setStorage({
                                key: "i",
                                data: a
                            });
                        } else a = 1, t.setData({
                            i: a,
                            beadimg: "../../res/" + a + ".png"
                        }), wx.setStorage({
                            key: "i",
                            data: a
                        });
                    });
                });
            }
        }), t.data.i < 5) {
            var a = t.data.i + 1;
            t.setData({
                i: a,
                beadimg: "../../res/" + a + ".png"
            }), wx.setStorage({
                key: "i",
                data: a
            });
        } else a = 1, t.setData({
            i: a,
            beadimg: "../../res/" + a + ".png"
        }), wx.setStorage({
            key: "i",
            data: a
        });
    },
    getCurrentDate: function(t = 0) {
        const e = new Date();
        e.setDate(e.getDate() + t);
        const a = {
            year: e.getFullYear(),
            month: e.getMonth() + 1,
            date: e.getDate()
        };
        return a.year + "" + (a.month >= 10 ? a.month : "0" + a.month) + (a.date >= 10 ? a.date : "0" + a.date);
    },
    change: function(t) {
        var e = this.data.score + 1;
        this.data.audio && this.innerAudioContext.play();
        var a = "" + this.data.score, n = a.substr("" + a.length - 1);
        console.log(n);
        var o = [ "agd" + n ];
        this["agd" + n].top("51%").step().top("40%").opacity(1).step(50).opacity(0).step().step().top("51%"), 
        this.setData({
            [o]: this["agd" + n].export()
        }), this.setData({
            score: e
        }), wx.setStorageSync("fz" + this.getCurrentDate(), e);
    },
    onShareAppMessage: function() {
        return {
            title: wx.getStorageSync("fz" + this.getCurrentDate()) ? "今日我已功德+" + wx.getStorageSync("fz" + this.getCurrentDate()) + "，你也一起来用电子念珠吧！" : "我发现了一款不错的解压神器！快来试一试吧！",
            path: "pages/fozhu/index",
            imageUrl: "/res/share.jpg"
        };
    },
    onShareTimeline: function() {
        return {
            title: wx.getStorageSync("fz" + this.getCurrentDate()) ? "今日我已功德+" + wx.getStorageSync("fz" + this.getCurrentDate()) + "，你也一起来用电子念珠吧！" : "我发现了一款不错的解压神器！快来试一试吧！",
            imageUrl: "/res/share.jpg",
            query: {
                path: "fozhu"
            }
        };
    },
    onAddToFavorites: function(t) {
        return {
            title: "电子念珠",
            imageUrl: "/res/share.jpg",
            query: {
                path: "fozhu"
            }
        };
    }
});