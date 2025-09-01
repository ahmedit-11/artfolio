<?php

namespace App\Services;

use App\Models\User;
use App\Models\Project;
use App\Models\Tag;
use App\Models\UserSearch;
use App\Models\Like;
use App\Models\View;

class RecommendationService
{
    public function getRecommendedProjects(User $user, $limit = 10)
    {
        // 1. من تفاعلات المستخدم tags جمع أوزان  
        $userTags = $this->getUserWeightedTags($user);
        
        // 2. إذا لا يوجد بيانات كافية → إرجاع عشوائي
        if (empty($userTags)) {
            return Project::with(['user', 'media', 'tags'])
                        ->whereNotIn('id', $this->getSeenProjectIds($user))
                        ->inRandomOrder()
                        ->limit($limit)
                        ->get();
        }
        
        // 3.المفضلة tags جلب المشاريع بناءً على  
        $recommendedProjects = $this->getProjectsByTags(array_keys($userTags), $user);
        
        // 4. إذا النتائج قليلة → إضافة عشوائية
        if ($recommendedProjects->count() < $limit) {
            $randomProjects = Project::with(['user', 'media', 'tags'])
                ->whereNotIn('id', $recommendedProjects->pluck('id')->merge($this->getSeenProjectIds($user)))
                ->inRandomOrder()
                ->limit($limit - $recommendedProjects->count())
                ->get();
            
            $recommendedProjects = $recommendedProjects->merge($randomProjects);
        }
        
        return $recommendedProjects->take($limit);
    }
    
    private function getUserWeightedTags(User $user)
    {
        $tagsWeights = [];
        
        // أوزان التفاعلات
        $weights = [
            'like' => 3,    // لايك → وزن 3
            'search' => 2,  // بحث → وزن 2  
            'view' => 1     // مشاهدة → وزن 1
        ];
        
        // 1. الإعجابات
        $likedProjects = $user->likes()->with('project.tags')->get();
        foreach ($likedProjects as $like) {
            foreach ($like->project->tags as $tag) {
                $tagsWeights[$tag->id] = ($tagsWeights[$tag->id] ?? 0) + $weights['like'];
            }
        }
        
        // 2. عمليات البحث
        $searches = UserSearch::where('user_id', $user->id)->get();
        foreach ($searches as $search) {
            $matchingTags = Tag::where('name', 'like', "%{$search->search_term}%")->get();
            foreach ($matchingTags as $tag) {
                $tagsWeights[$tag->id] = ($tagsWeights[$tag->id] ?? 0) + $weights['search'];
            }
        }
        
        // 3. المشاهدات
        $viewedProjects = $user->views()->with('project.tags')->get();
        foreach ($viewedProjects as $view) {
            foreach ($view->project->tags as $tag) {
                $tagsWeights[$tag->id] = ($tagsWeights[$tag->id] ?? 0) + $weights['view'];
            }
        }
        
        // حسب الوزن tags ترتيب
        arsort($tagsWeights);
        
        return array_slice($tagsWeights, 0, 10); //tags أعلى 10 
    }
    
    private function getProjectsByTags(array $tagIds, User $user)
    {
        return Project::with(['user', 'media', 'tags'])
                    ->whereHas('tags', function ($query) use ($tagIds) {
                        $query->whereIn('tags.id', $tagIds);
                    })
                    ->whereNotIn('id', $this->getSeenProjectIds($user))
                   ->orderBy('created_at', 'desc')
                    ->limit(20)
                    ->get();
    }
    
    private function getSeenProjectIds(User $user)
    {
        return $user->likes()->pluck('project_id')
                    ->merge($user->views()->pluck('project_id'))
                    ->unique()
                    ->toArray();
    }
}