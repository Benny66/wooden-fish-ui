!function() {
    getApp();
    var t = "", e = "";
    Page({
        data: {
            auto: !1,
            count: 0,
            audio: !0,
            opengo: !0
        },
        onShow: function() {
            if (wx.showShareMenu({
                withShareTicket: !1,
                menus: [ "shareAppMessage", "shareTimeline" ]
            }), wx.getStorageSync("my" + this.getCurrentDate())) console.log(wx.getStorageSync("my" + this.getCurrentDate())), 
            this.setData({
                count: wx.getStorageSync("my" + this.getCurrentDate())
            }); else for (let t = -1; t > -3; t--) wx.removeStorageSync("my" + this.getCurrentDate(t));
        },
        onHide: function() {
            this.innerAudioContext.stop(), this.timer && clearInterval(this.timer), this.setData({
                auto: !1
            });
        },
        resetcount: function() {
            var t = this;
            wx.showModal({
                title: "提示",
                content: "是否重置数据？",
                success: function(e) {
                    e.confirm ? (wx.getStorageSync("my" + t.getCurrentDate()) && wx.removeStorageSync("my" + t.getCurrentDate()), 
                    t.setData({
                        count: 0
                    })) : e.cancel && (console.log("用户点击取消"), wx.reportEvent("refresh", {
                        yesno: "no"
                    }));
                }
            });
        },
        openaudio: function() {
            this.setData({
                audio: !this.data.audio
            });
        },
        onLoad: function() {
            var n = this;
            console.log(getApp().videoid), getApp().videoid && wx.createRewardedVideoAd && ((e = wx.createRewardedVideoAd({
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
            }, 2e3)), this.innerAudioContext = wx.createInnerAudioContext(), this.innerAudioContext.src = "audio/qiaoji.mp3", 
            this.innerAudioContext.onPlay(function() {}), this.innerAudioContext.onError(function(t) {
                console.log(t.errMsg), console.log(t.errCode);
            }), this.innerAudioContext2 = wx.createInnerAudioContext(), this.innerAudioContext2.src = "audio/qiaoji.mp3", 
            this.innerAudioContext2.onPlay(function() {}), this.innerAudioContext2.onError(function(t) {
                console.log(t.errMsg), console.log(t.errCode);
            }), this.innerAudioContext3 = wx.createInnerAudioContext(), this.innerAudioContext3.src = "audio/qiaoji.mp3", 
            this.innerAudioContext3.onPlay(function() {}), this.innerAudioContext3.onError(function(t) {
                console.log(t.errMsg), console.log(t.errCode);
            }), this.innerAudioContext4 = wx.createInnerAudioContext(), this.innerAudioContext4.src = "audio/qiaoji.mp3", 
            this.innerAudioContext4.onPlay(function() {}), this.innerAudioContext4.onError(function(t) {
                console.log(t.errMsg), console.log(t.errCode);
            }), this.aniamtion = wx.createAnimation({
                duration: 50,
                transformOrigin: "right top",
                timingFunction: "ease-in-out"
            });
            for (var o = 0; o < 10; o++) this["agd" + o] = wx.createAnimation({
                duration: 250,
                transformOrigin: "right top",
                timingFunction: "ease-out"
            });
        },
        overvideo: function() {
            wx.setStorageSync("my-key", this.getCurrentDate()), this.timer = setInterval(this.konck, 700), 
            this.setData({
                auto: !0
            });
        },
        konck: function() {
            this.data.audio && (this.data.count % 4 == 0 ? (this.innerAudioContext4.stop(), 
            this.innerAudioContext4.play()) : this.data.count % 3 == 0 ? (this.innerAudioContext3.stop(), 
            this.innerAudioContext3.play()) : this.data.count % 2 == 0 ? (this.innerAudioContext2.stop(), 
            this.innerAudioContext2.play()) : (this.innerAudioContext.stop(), this.innerAudioContext.play()));
            var t = "" + this.data.count, e = t.substr("" + t.length - 1);
            console.log(e);
            var n = [ "agd" + e ];
            this["agd" + e].top("51%").step().top("40%").opacity(1).step(50).opacity(0).step().step().top("51%"), 
            this.aniamtion.rotate(0).step().rotate(40).step(), this.setData({
                animationData: this.aniamtion.export(),
                [n]: this["agd" + e].export()
            }), this.setData({
                count: this.data.count + 1
            }), wx.setStorageSync("my" + this.getCurrentDate(), this.data.count);
        },
        autoplay: function() {
            return this.data.auto ? (this.timer && clearInterval(this.timer), this.setData({
                auto: !1
            }), !1) : wx.getStorageSync("my-key") && wx.getStorageSync("my-key") == this.getCurrentDate() ? (this.overvideo(), 
            !1) : void (e ? wx.showModal({
                title: "未解锁",
                content: "看一段视频，可在今天无限使用此功能",
                confirmColor: "#439057",
                success: function(t) {
                    t.confirm && e && e.show().catch(function() {
                        e.load().then(function() {
                            return e.show();
                        }).catch(function(t) {
                            this.timer = setInterval(this.konck, 700), this.setData({
                                auto: !0
                            });
                        });
                    });
                }
            }) : (this.timer = setInterval(this.konck, 700), this.setData({
                auto: !0
            })));
        },
        getCurrentDate: function(t = 0) {
            const e = new Date();
            e.setDate(e.getDate() + t);
            const n = {
                year: e.getFullYear(),
                month: e.getMonth() + 1,
                date: e.getDate()
            };
            return n.year + "" + (n.month >= 10 ? n.month : "0" + n.month) + (n.date >= 10 ? n.date : "0" + n.date);
        },
        onShareAppMessage: function(t) {
            return {
                title: wx.getStorageSync("my" + this.getCurrentDate()) ? "今日我已功德+" + wx.getStorageSync("my" + this.getCurrentDate()) + "，你也一起来敲电子木鱼吧！" : "我发现了一款不错的解压神器！快来试一试吧！",
                path: "/pages/index/index",
                imageUrl: "/images/index/share.jpg"
            };
        },
        onShareTimeline: function() {
            return {
                title: wx.getStorageSync("my" + this.getCurrentDate()) ? "今日我已功德+" + wx.getStorageSync("my" + this.getCurrentDate()) + "，你也一起来敲电子木鱼吧！" : "我发现了一款不错的解压神器！快来试一试吧！",
                imageUrl: "/images/index/share.jpg"
            };
        },
        onAddToFavorites: function(t) {
            return {
                title: "功德木鱼",
                imageUrl: "/images/index/share.jpg"
            };
        }
    });
}();